﻿interface Classification {
    position: number;
    length: number;
    class: ts.TokenClass;
}

interface ClassiferResult {
    tuples: Classification[];
    finalEndOfLineState: ts.EndOfLineState;
}

interface ClassificationEntry {
    value: any;
    class: ts.TokenClass;
}

describe('Colorization', function () {
    var mytypescriptLS = new Harness.LanguageService.TypeScriptLS();
    var myclassifier = mytypescriptLS.getClassifier();

    function getClassifications(code: string, initialEndOfLineState: ts.EndOfLineState = ts.EndOfLineState.Start): ClassiferResult {
        var classResult = myclassifier.getClassificationsForLine(code, initialEndOfLineState).split('\n');
        var tuples: Classification[] = [];
        var i = 0;
        var position = 0;

        for (; i < classResult.length - 1; i += 2) {
            var t = tuples[i / 2] = {
                position: position,
                length: parseInt(classResult[i]),
                class: parseInt(classResult[i + 1])
            };

            assert.isTrue(t.length > 0, "Result length should be greater than 0, got :" + t.length);
            position += t.length;
        }
        var finalEndOfLineState = classResult[classResult.length - 1];

        assert.equal(position, code.length, "Expected accumilative length of all entries to match the length of the source. expected: " + code.length + ", but got: " + position);

        return {
            tuples: tuples,
            finalEndOfLineState: parseInt(finalEndOfLineState)
        };
    }

    function verifyClassification(classification: Classification, expectedLength: number, expectedClass: number) {
        assert.isNotNull(classification);
        assert.equal(classification.length, expectedLength, "Classification length does not match expected. Expected: " + expectedLength + ", Actual: " + classification.length);
        assert.equal(classification.class, expectedClass, "Classification class does not match expected. Expected: " + ts.TokenClass[expectedClass] + ", Actual: " + ts.TokenClass[classification.class]);
    }

    function getEntryAtPosistion(result: ClassiferResult, position: number) {
        for (var i = 0, n = result.tuples.length; i < n; i++) {
            if (result.tuples[i].position === position) return result.tuples[i];
        }
        return undefined;
    }

    function punctuation(text: string) { return { value: text, class: ts.TokenClass.Punctuation }; }
    function keyword(text: string) { return { value: text, class: ts.TokenClass.Keyword }; }
    function operator(text: string) { return { value: text, class: ts.TokenClass.Operator }; }
    function comment(text: string) { return { value: text, class: ts.TokenClass.Comment }; }
    function whitespace(text: string) { return { value: text, class: ts.TokenClass.Whitespace }; }
    function identifier(text: string) { return { value: text, class: ts.TokenClass.Identifier }; }
    function numberLiteral(text: string) { return { value: text, class: ts.TokenClass.NumberLiteral }; }
    function stringLiteral(text: string) { return { value: text, class: ts.TokenClass.StringLiteral }; }
    function regExpLiteral(text: string) { return { value: text, class: ts.TokenClass.RegExpLiteral }; }
    function finalEndOfLineState(value: number) { return { value: value, class: undefined }; }

    function test(text: string, initialEndOfLineState: ts.EndOfLineState, ...expectedEntries: ClassificationEntry[]): void {
        var result = getClassifications(text, initialEndOfLineState);

        for (var i = 0, n = expectedEntries.length; i < n; i++) {
            var expectedEntry = expectedEntries[i];

            if (expectedEntry.class === undefined) {
                assert.equal(result.finalEndOfLineState, expectedEntry.value, "final endOfLineState does not match expected.");
            }
            else {
                var actualEntryPosition = text.indexOf(expectedEntry.value);
                assert(actualEntryPosition >= 0, "token: '" + expectedEntry.value + "' does not exit in text: '" + text + "'.");

                var actualEntry = getEntryAtPosistion(result, actualEntryPosition);

                assert(actualEntry, "Could not find classification entry for '" + expectedEntry.value + "' at position: " + actualEntryPosition);
                assert.equal(actualEntry.length, expectedEntry.value.length, "Classification class does not match expected.");
                assert.equal(actualEntry.class, expectedEntry.class,  "Classification class does not match expected.");
            }
        }
    }

    describe("test getClassifications", function () {
        it("Returns correct token classes", function () {
            test("var x: string = \"foo\"; //Hello",
                ts.EndOfLineState.Start,
                keyword("var"),
                whitespace(" "),
                identifier("x"),
                punctuation(":"),
                keyword("string"),
                operator("="),
                stringLiteral("\"foo\""),
                comment("//Hello"),
                punctuation(";"));
        });

        it("classifies correctelly a comment after a divide operator", function () {
            test("1 / 2 // comment",
                ts.EndOfLineState.Start,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                comment("// comment"));
        });

        it("classifies correctelly a literal after a divide operator", function () {
            test("1 / 2, 3 / 4",
                ts.EndOfLineState.Start,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                numberLiteral("3"),
                numberLiteral("4"),
                operator(","));
        });

        it("classifies correctelly an unterminated multi-line string", function () {
            test("'line1\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("classifies correctelly the second line of an unterminated multi-line string", function () {
            test("\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(ts.EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("classifies correctelly the last line of a multi-line string", function () {
            test("'",
                ts.EndOfLineState.InSingleQuoteStringLiteral,
                stringLiteral("'"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("classifies correctelly an unterminated multiline comment", function () {
            test("/*",
                ts.EndOfLineState.Start,
                comment("/*"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("classifies correctelly an unterminated multiline comment with trailing space", function () {
            test("/* ",
                ts.EndOfLineState.Start,
                comment("/* "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("classifies correctelly a keyword after a dot", function () {
            test("a.var",
                ts.EndOfLineState.Start,
                identifier("var"));
        });

        it("classifies keyword after a dot on previous line", function () {
            test("var",
                ts.EndOfLineState.EndingWithDotToken,
                identifier("var"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
    });
});