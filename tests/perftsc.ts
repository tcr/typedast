/// <reference path="perfsys.ts"/>
/// <reference path="..\src\compiler\tsc.ts"/>

// resolve all files used in this compilation
if (perftest.hasLogIOFlag()) {
    perftest.interceptIO();

    var compilerHost: ts.CompilerHost = {
        getSourceFile: (s, v) => {
            var content = perftest.readFile(s);
            return content !== undefined ? ts.createSourceFile(s, content, v) : undefined;
        },
        getDefaultLibFilename: () => ts.combinePaths(ts.getDirectoryPath(ts.normalizePath(perftest.getExecutingFilePath())), "lib.d.ts"),
        writeFile: (f: string, content: string) => { throw new Error("Unexpected operation: writeFile"); },
        getCurrentDirectory: () => perftest.getCurrentDirectory(),
        getCanonicalFileName: ts.getCanonicalFileName,
        useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
        getNewLine: () => sys.newLine
    };

    var commandLine = ts.parseCommandLine(perftest.getArgsWithoutLogIOFlag());
    var program = ts.createProgram(commandLine.filenames, commandLine.options, compilerHost);
    var fileNames = program.getSourceFiles().map(f => f.filename);
    perftest.writeIOLog(fileNames);
}
else {
    var io = perftest.prepare();
    ts.executeCommandLine(perftest.getArgsWithoutIOLogFile());
    perftest.write(io.getOut());
}
