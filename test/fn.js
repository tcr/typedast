var fs = require('fs');
var typed = require('../');
var falafel = require('falafel');

typed.compile(fs.readFileSync(__dirname + '/test-fn.ts', 'utf-8'), function (err, result) {
  console.log(result.types);
  falafel(result.javascript, {
    loc: true
  }, function (node) {
      console.log(node.type, result.getType(node))
  })
});