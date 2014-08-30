var fs = require('fs');
var typed = require('../');
var falafel = require('falafel');

typed.compile(fs.readFileSync(__dirname + '/interface.ts', 'utf-8'), function (err, result) {
  falafel(result.javascript, {
    loc: true
  }, function (node) {
    if (node.type == 'VariableDeclarator') {
      console.log(result.getType(node))
    }
  })
});