var fs = require('fs'),
    path = require('path'),
    types = require('node-sass').types;

module.exports = function(options) {
  options = options || {};

  var base = options.base || process.cwd();

  return {
    'inline-svg($file)': function(file) {
      var relativePath = './' + file.getValue();
      var filePath = path.resolve(base, relativePath);
      var data = fs.readFileSync(filePath);

      var buffer = new Buffer(data);

      var str = '"data:image/svg+xml;base64,' + buffer.toString('base64') + '"';
      return types.String(str);
    }
  };
};
