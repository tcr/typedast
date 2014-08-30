# typedast

Use all of TypeScript to infor your types!

```js
var typedast = require('typedast');
var fs = require('fs');

typedast.compile(fs.readFileSync('file.ts'), function (err, result) {
	result.javascript; // parse this
	result.getType; // call getType(node) to get a type for an AST node!
	result.types; // for debug
})
```

## license

MIT
