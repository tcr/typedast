//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='harness.ts'/>

module Harness.SourceMapRecoder {

    interface SourceMapSpanWithDecodeErrors {
        sourceMapSpan: ts.SourceMapSpan;
        decodeErrors: string[];
    }

    module SourceMapDecoder {
        var sourceMapMappings: string;
        var sourceMapNames: string[];
        var decodingIndex: number;
        var prevNameIndex: number;
        var decodeOfEncodedMapping: ts.SourceMapSpan;
        var errorDecodeOfEncodedMapping: string;

        export function initializeSourceMapDecoding(sourceMapData: ts.SourceMapData) {
            sourceMapMappings = sourceMapData.sourceMapMappings;
            sourceMapNames = sourceMapData.sourceMapNames;
            decodingIndex = 0;
            prevNameIndex = 0;
            decodeOfEncodedMapping = {
                emittedLine: 1,
                emittedColumn: 1,
                sourceLine: 1,
                sourceColumn: 1,
                sourceIndex: 0,
            };
            errorDecodeOfEncodedMapping = undefined;
        }

        function isSourceMappingSegmentEnd() {
            if (decodingIndex == sourceMapMappings.length) {
                return true;
            }

            if (sourceMapMappings.charAt(decodingIndex) == ',') {
                return true;
            }

            if (sourceMapMappings.charAt(decodingIndex) == ';') {
                return true;
            }

            return false;
        }

        export function decodeNextEncodedSourceMapSpan() {
            errorDecodeOfEncodedMapping = undefined;

            function createErrorIfCondition(condition: boolean, errormsg: string) {
                if (errorDecodeOfEncodedMapping) {
                    // there was existing error:
                    return true;
                }

                if (condition) {
                    errorDecodeOfEncodedMapping = errormsg;
                }

                return condition;
            }

            function base64VLQFormatDecode() {
                function base64FormatDecode() {
                    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(sourceMapMappings.charAt(decodingIndex));
                }

                var moreDigits = true;
                var shiftCount = 0;
                var value = 0;

                for (; moreDigits; decodingIndex++) {
                    if (createErrorIfCondition(decodingIndex >= sourceMapMappings.length, "Error in decoding base64VLQFormatDecode, past the mapping string")) {
                        return;
                    }

                    // 6 digit number
                    var currentByte = base64FormatDecode();

                    // If msb is set, we still have more bits to continue
                    moreDigits = (currentByte & 32) != 0;

                    // least significant 5 bits are the next msbs in the final value.
                    value = value | ((currentByte & 31) << shiftCount);
                    shiftCount += 5;
                }

                // Least significant bit if 1 represents negative and rest of the msb is actual absolute value
                if ((value & 1) == 0) {
                    // + number
                    value = value >> 1;
                }
                else {
                    // - number
                    value = value >> 1;
                    value = -value;
                }

                return value;
            }

            while (decodingIndex < sourceMapMappings.length) {
                if (sourceMapMappings.charAt(decodingIndex) == ';') {
                    // New line
                    decodeOfEncodedMapping.emittedLine++;
                    decodeOfEncodedMapping.emittedColumn = 1;
                    decodingIndex++;
                    continue;
                }

                if (sourceMapMappings.charAt(decodingIndex) == ',') {
                    // Next entry is on same line - no action needed
                    decodingIndex++;
                    continue;
                }

                // Read the current span
                // 1. Column offset from prev read jsColumn
                decodeOfEncodedMapping.emittedColumn += base64VLQFormatDecode();
                // Incorrect emittedColumn dont support this map
                if (createErrorIfCondition(decodeOfEncodedMapping.emittedColumn < 1, "Invalid emittedColumn found")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }
                // Dont support reading mappings that dont have information about original source and its line numbers
                if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after emitted column")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }

                // 2. Relative sourceIndex 
                decodeOfEncodedMapping.sourceIndex += base64VLQFormatDecode();
                // Incorrect sourceIndex dont support this map
                if (createErrorIfCondition(decodeOfEncodedMapping.sourceIndex < 0, "Invalid sourceIndex found")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }
                // Dont support reading mappings that dont have information about original source span
                if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after sourceIndex")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }

                // 3. Relative sourceLine 0 based
                decodeOfEncodedMapping.sourceLine += base64VLQFormatDecode();
                // Incorrect sourceLine dont support this map
                if (createErrorIfCondition(decodeOfEncodedMapping.sourceLine < 1, "Invalid sourceLine found")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }
                // Dont support reading mappings that dont have information about original source and its line numbers
                if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after emitted Line")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }

                // 4. Relative sourceColumn 0 based 
                decodeOfEncodedMapping.sourceColumn += base64VLQFormatDecode();
                // Incorrect sourceColumn dont support this map
                if (createErrorIfCondition(decodeOfEncodedMapping.sourceColumn < 1, "Invalid sourceLine found")) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }
                // 5. Check if there is name:
                decodeOfEncodedMapping.nameIndex = -1;
                if (!isSourceMappingSegmentEnd()) {
                    prevNameIndex += base64VLQFormatDecode();
                    decodeOfEncodedMapping.nameIndex = prevNameIndex;
                    // Incorrect nameIndex dont support this map
                    if (createErrorIfCondition(decodeOfEncodedMapping.nameIndex < 0 || decodeOfEncodedMapping.nameIndex >= sourceMapNames.length, "Invalid name index for the source map entry")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                }
                // Dont support reading mappings that dont have information about original source and its line numbers
                if (createErrorIfCondition(!isSourceMappingSegmentEnd(), "Unsupported Error Format: There are more entries after " + (decodeOfEncodedMapping.nameIndex == -1 ? "sourceColumn" : "nameIndex"))) {
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }

                // Populated the entry
                return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
            }

            createErrorIfCondition(true, "No encoded entry found");
        }

        export function hasCompletedDecoding() {
            return decodingIndex === sourceMapMappings.length;
        }

        export function getRemainingDecodeString() {
            return sourceMapMappings.substr(decodingIndex);
        }
    }

    module SourceMapSpanWriter {
        var sourceMapRecoder: Compiler.WriterAggregator;
        var sourceMapSources: string[];
        var sourceMapNames: string[];

        var jsFile: Compiler.GeneratedFile;
        var jsLineMap: number[];
        var tsCode: string;
        var tsLineMap: number[];

        var spansOnSingleLine: SourceMapSpanWithDecodeErrors[];
        var prevWrittenSourcePos: number;
        var prevWrittenJsLine: number;
        var spanMarkerContinues: boolean;

        export function intializeSourceMapSpanWriter(sourceMapRecordWriter: Compiler.WriterAggregator, sourceMapData: ts.SourceMapData, currentJsFile: Compiler.GeneratedFile) {
            sourceMapRecoder = sourceMapRecordWriter;
            sourceMapSources = sourceMapData.sourceMapSources;
            sourceMapNames = sourceMapData.sourceMapNames;

            jsFile = currentJsFile;
            jsLineMap = ts.getLineStarts(jsFile.code);

            spansOnSingleLine = [];
            prevWrittenSourcePos = 0;
            prevWrittenJsLine = 0;
            spanMarkerContinues = false;

            SourceMapDecoder.initializeSourceMapDecoding(sourceMapData);

            sourceMapRecoder.WriteLine("===================================================================");
            sourceMapRecoder.WriteLine("JsFile: " + sourceMapData.sourceMapFile);
            sourceMapRecoder.WriteLine("mapUrl: " + sourceMapData.jsSourceMappingURL);
            sourceMapRecoder.WriteLine("sourceRoot: " + sourceMapData.sourceMapSourceRoot);
            sourceMapRecoder.WriteLine("sources: " + sourceMapData.sourceMapSources);
            sourceMapRecoder.WriteLine("===================================================================");
        }

        function getSourceMapSpanString(mapEntry: ts.SourceMapSpan, getAbsentNameIndex?: boolean) {
            var mapString = "Emitted(" + mapEntry.emittedLine + ", " + mapEntry.emittedColumn + ") Source(" + mapEntry.sourceLine + ", " + mapEntry.sourceColumn + ") + SourceIndex(" + mapEntry.sourceIndex + ")";
            if (mapEntry.nameIndex >= 0 && mapEntry.nameIndex < sourceMapNames.length) {
                mapString += " name (" + sourceMapNames[mapEntry.nameIndex] + ")";
            }
            else {
                if (mapEntry.nameIndex != -1 || getAbsentNameIndex) {
                    mapString += " nameIndex (" + mapEntry.nameIndex + ")";
                }
            }

            return mapString;
        }

        export function recordSourceMapSpan(sourceMapSpan: ts.SourceMapSpan) {
            // verify the decoded span is same as the new span
            var decodeResult = SourceMapDecoder.decodeNextEncodedSourceMapSpan();
            var decodedErrors: string[];
            if (decodeResult.error
                || decodeResult.sourceMapSpan.emittedLine != sourceMapSpan.emittedLine
                || decodeResult.sourceMapSpan.emittedColumn != sourceMapSpan.emittedColumn
                || decodeResult.sourceMapSpan.sourceLine != sourceMapSpan.sourceLine
                || decodeResult.sourceMapSpan.sourceColumn != sourceMapSpan.sourceColumn
                || decodeResult.sourceMapSpan.sourceIndex != sourceMapSpan.sourceIndex
                || decodeResult.sourceMapSpan.nameIndex != sourceMapSpan.nameIndex) {
                if (decodeResult.error) {
                    decodedErrors = ["!!^^ !!^^ There was decoding error in the sourcemap at this location: " + decodeResult.error];
                }
                else {
                    decodedErrors = ["!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:"];
                }
                decodedErrors.push("!!^^ !!^^ Decoded span from sourcemap's mappings entry: " + getSourceMapSpanString(decodeResult.sourceMapSpan, /*getAbsentNameIndex*/ true) + " Span encoded by the emitter:" + getSourceMapSpanString(sourceMapSpan, /*getAbsentNameIndex*/ true));
            }

            if (spansOnSingleLine.length && spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine) {
                // On different line from the one that we have been recording till now, 
                writeRecordedSpans();
                spansOnSingleLine = [{ sourceMapSpan: sourceMapSpan, decodeErrors: decodedErrors }];
            }
            else {
                spansOnSingleLine.push({ sourceMapSpan: sourceMapSpan, decodeErrors: decodedErrors });
            }
        }

        export function recordNewSourceFileSpan(sourceMapSpan: ts.SourceMapSpan, newSourceFileCode: string) {
            assert.isTrue(spansOnSingleLine.length == 0 || spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine, "new file source map span should be on new line. We currently handle only that scenario");
            recordSourceMapSpan(sourceMapSpan);

            assert.isTrue(spansOnSingleLine.length === 1);
            sourceMapRecoder.WriteLine("-------------------------------------------------------------------");
            sourceMapRecoder.WriteLine("emittedFile:" + jsFile.fileName);
            sourceMapRecoder.WriteLine("sourceFile:" + sourceMapSources[spansOnSingleLine[0].sourceMapSpan.sourceIndex]);
            sourceMapRecoder.WriteLine("-------------------------------------------------------------------");

            tsLineMap = ts.getLineStarts(newSourceFileCode);
            tsCode = newSourceFileCode;
            prevWrittenSourcePos = 0;
        }

        export function close() {
            // Write the lines pending on the single line
            writeRecordedSpans();

            if (!SourceMapDecoder.hasCompletedDecoding()) {
                sourceMapRecoder.WriteLine("!!!! **** There are more source map entries in the sourceMap's mapping than what was encoded");
                sourceMapRecoder.WriteLine("!!!! **** Remaining decoded string: " + SourceMapDecoder.getRemainingDecodeString());

            }

            // write remaining js lines
            writeJsFileLines(jsLineMap.length);
        }

        function getTextOfLine(line: number, lineMap: number[], code: string) {
            var startPos = lineMap[line];
            var endPos = lineMap[line + 1];
            return code.substring(startPos, endPos);
        }

        function writeJsFileLines(endJsLine: number) {
            for (; prevWrittenJsLine < endJsLine; prevWrittenJsLine++) {
                sourceMapRecoder.Write(">>>" + getTextOfLine(prevWrittenJsLine, jsLineMap, jsFile.code));
            }
        }

        function writeRecordedSpans() {
            function getMarkerId(markerIndex: number) {
                var markerId = "";
                if (spanMarkerContinues) {
                    assert.isTrue(markerIndex === 0);
                    markerId = "1->";
                }
                else {
                    var markerId = "" + (markerIndex + 1);
                    if (markerId.length < 2) {
                        markerId = markerId + " ";
                    }
                    markerId += ">";
                }
                return markerId;
            }

            var prevEmittedCol: number;
            function iterateSpans(fn: (currentSpan: SourceMapSpanWithDecodeErrors, index: number) => void) {
                prevEmittedCol = 1;
                for (var i = 0; i < spansOnSingleLine.length; i++) {
                    fn(spansOnSingleLine[i], i);
                    prevEmittedCol = spansOnSingleLine[i].sourceMapSpan.emittedColumn;
                }
            }

            function writeSourceMapIndent(indentLength: number, indentPrefix: string) {
                sourceMapRecoder.Write(indentPrefix);
                for (var i = 1; i < indentLength; i++) {
                    sourceMapRecoder.Write(" ");
                }
            }

            function writeSourceMapMarker(currentSpan: SourceMapSpanWithDecodeErrors, index: number, endColumn = currentSpan.sourceMapSpan.emittedColumn, endContinues?: boolean) {
                var markerId = getMarkerId(index);
                markerIds.push(markerId);

                writeSourceMapIndent(prevEmittedCol, markerId);

                for (var i = prevEmittedCol; i < endColumn; i++) {
                    sourceMapRecoder.Write("^");
                }
                if (endContinues) {
                    sourceMapRecoder.Write("->");
                }
                sourceMapRecoder.WriteLine("");
                spanMarkerContinues = endContinues;
            }

            function writeSourceMapSourceText(currentSpan: SourceMapSpanWithDecodeErrors, index: number) {
                var sourcePos = tsLineMap[currentSpan.sourceMapSpan.sourceLine - 1] + (currentSpan.sourceMapSpan.sourceColumn - 1);
                var sourceText = "";
                if (prevWrittenSourcePos < sourcePos) {
                    // Position that goes forward, get text
                    sourceText = tsCode.substring(prevWrittenSourcePos, sourcePos);
                }

                if (currentSpan.decodeErrors) {
                    // If there are decode errors, write
                    for (var i = 0; i < currentSpan.decodeErrors.length; i++) {
                        writeSourceMapIndent(prevEmittedCol, markerIds[index]);
                        sourceMapRecoder.WriteLine(currentSpan.decodeErrors[i]);
                    }
                }

                var tsCodeLineMap = ts.getLineStarts(sourceText);
                for (var i = 0; i < tsCodeLineMap.length; i++) {
                    writeSourceMapIndent(prevEmittedCol, i == 0 ? markerIds[index] : "  >");
                    sourceMapRecoder.Write(getTextOfLine(i, tsCodeLineMap, sourceText));
                    if (i == tsCodeLineMap.length - 1) {
                        sourceMapRecoder.WriteLine("");
                    }
                }

                prevWrittenSourcePos = sourcePos;
            }

            function writeSpanDetails(currentSpan: SourceMapSpanWithDecodeErrors, index: number) {
                sourceMapRecoder.WriteLine(markerIds[index] + getSourceMapSpanString(currentSpan.sourceMapSpan));
            }

            if (spansOnSingleLine.length) {
                var currentJsLine = spansOnSingleLine[0].sourceMapSpan.emittedLine;

                // Write js line
                writeJsFileLines(currentJsLine);

                // Emit markers
                var markerIds: string[] = [];
                iterateSpans(writeSourceMapMarker);

                var jsFileText = getTextOfLine(currentJsLine, jsLineMap, jsFile.code);
                if (prevEmittedCol < jsFileText.length) {
                    // There is remaining text on this line that will be part of next source span so write marker that continues
                    writeSourceMapMarker(undefined, spansOnSingleLine.length, /*endColumn*/ jsFileText.length, /*endContinues*/ true);
                }

                // Emit Source text
                iterateSpans(writeSourceMapSourceText);

                // Emit column number etc
                iterateSpans(writeSpanDetails);

                sourceMapRecoder.WriteLine("---");
            }
        }
    }

    export function getSourceMapRecord(sourceMapDataList: ts.SourceMapData[], program: ts.Program, jsFiles: Compiler.GeneratedFile[]) {
        var sourceMapRecoder = new Compiler.WriterAggregator();

        for (var i = 0; i < sourceMapDataList.length; i++) {
            var sourceMapData = sourceMapDataList[i];
            var prevSourceFile: ts.SourceFile = null;

            SourceMapSpanWriter.intializeSourceMapSpanWriter(sourceMapRecoder, sourceMapData, jsFiles[i]);
            for (var j = 0; j < sourceMapData.sourceMapDecodedMappings.length; j++) {
                var decodedSourceMapping = sourceMapData.sourceMapDecodedMappings[j];
                var currentSourceFile = program.getSourceFile(sourceMapData.inputSourceFileNames[decodedSourceMapping.sourceIndex]);
                if (currentSourceFile != prevSourceFile) {
                    SourceMapSpanWriter.recordNewSourceFileSpan(decodedSourceMapping, currentSourceFile.text);
                    prevSourceFile = currentSourceFile;
                }
                else {
                    SourceMapSpanWriter.recordSourceMapSpan(decodedSourceMapping);
                }
            }
            SourceMapSpanWriter.close();// If the last spans werent emitted, emit them
        }
        sourceMapRecoder.Close();
        return sourceMapRecoder.lines.join('\r\n');
    }
}
