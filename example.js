var fs = require('fs');
var util = require('util');
var typedast = require('./typedast');

typedast.parse(__dirname + '/input/hello.ts', function (err, ast) {
  console.log(util.inspect(ast, {
    depth: 100
  }));
})
