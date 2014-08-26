# typedacorn

The acorn.js parser, but using **ALL OF TYPESCRIPT** to analyze and give types to AST nodes.

```
var typedacorn = require('typedacorn');
var acorn = typedacorn.acorn; // optional
var walk = typedacorn.walk; // optional

typedacorn.parse('hello.ts', function (err, ast) {
	console.log(ast); // look for `datatype` properties of AST nodes!
})
```

## license

MIT
