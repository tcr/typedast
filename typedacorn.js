var fs = require('fs');
var spawn = require('child_process').spawn;
var split = require('split');
var acorn = require('acorn');
var walk = require('acorn/util/walk');

function generateTypes (filename, next) {
  var proc = spawn('node', [__dirname + '/TypeScript/built/local/tsc.js', filename]);
  var ret = [];
  proc.stdout.pipe(split()).on('data', function (json) {
    try {
      json = JSON.parse(json);
      ret.push(json);
    } catch (e) { }
  }).on('end', function () {
    next(null, ret);
  })
}


function genSnippet(gencode, pos1, pos2)
{
  var lines = gencode.split(/\n/).slice((pos1.line || 1) - 1, (pos2.line || 1));
  if (!lines.length) {
    return ''
  }
  lines[0] = lines[0].substr((pos1.column || 1) - 1);
  lines[lines.length - 1] = lines[lines.length - 1].substr(0, (pos2.column || 1) - (pos1.column || 1));
  return lines.join('\n');
}

function parse (filename, next) {
  generateTypes(filename, function (err, data) {
    // code = fs.readFileSync(__dirname + '/input/hello.ts', 'utf-8');
    var gencode = fs.readFileSync(filename.replace(/\.ts/, '.js'), 'utf-8');

    var ast = acorn.parse(gencode, {
      locations: true
    });

    var base2 = {}
    Object.keys(walk.base).forEach(function (k) {
      base2[k] = function (node, st, c) {
        data.filter(function (list) {
        return list.start.line == node.loc.start.line && list.start.column == node.loc.start.column + 1;
        }).map(function (list) {
        node.datatype = list.type;
        })
      }
    });
    walk.simple(ast, base2);

    next(null, ast);
  })
}

exports.generateTypes = generateTypes;
exports.parse = parse;
exports.acorn = acorn;
exports.walk = walk;
