var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var split = require('split');
var temp = require('temp');

temp.track();

function generateTypes (filename, next) {
  process.env.TYPEDAST = '1';
  var proc = spawn('node', [__dirname + '/TypeScript/built/local/tsc.js', filename, '-m', 'commonjs', '-removeComments']);
  var ret = [];
  // proc.stderr.pipe(process.stderr);
  proc.stdout.pipe(split()).on('data', function (json) {
    try {
      json = JSON.parse(json);
      ret.push(json);
    } catch (e) {
      // console.error(json);
    }
  }).on('end', function () {
    next(null, ret);
  })
}

function getType (types, node)
{
  var datatype = null;
  types.filter(function (list) {
    // console.error(list.type, list.start, node.loc.start);
    return list.start.line == node.loc.start.line && list.start.column == node.loc.start.column + 1;
  }).some(function (list) {
    datatype = list.type;
    return true;
  })
  return datatype;
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

function compile (data, opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }

  temp.mkdir('typedast', function(err, dirPath) {
    var file_ts = path.join(dirPath, opts.filename || 'input.ts');
    var file_js = path.join(dirPath, (opts.filename || 'input.ts').replace(/\.ts$/, '.js'));
    fs.writeFileSync(file_ts, data);

    generateTypes(file_ts, function (err, types) {
      var javascript = fs.readFileSync(file_js, 'utf-8');
      next(err, {
        javascript: javascript,
        types: types,
        getType: getType.bind(null, types),
      })
    });
  });
}

exports.generateTypes = generateTypes;
exports.compile = compile;
