class A {
	constructor() { }
}

function getLineInfo (input:string, offset:number) {
  for (var line = 1, cur = 0;;) {
    lineBreak.lastIndex = cur;
    var match = lineBreak.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else break;
  }
  return {line: line, column: offset - cur};
};

function sample2(a, b:A, c) {
    return "hello world";
}

var str = sample2("hey", new A(), true);
