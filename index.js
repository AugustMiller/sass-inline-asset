var fs = require('fs'),
    path = require('path'),
    types = require('node-sass').types,
    mime = require('mime');

module.exports = function(options) {
  options = options || {};

  var base = options.base || process.cwd();

  return {
    'inline-asset($file)': function(file) {
      var relativePath,
          filePath,
          extension,
          data,
          buffer;

      relativePath = './' + file.getValue();
      filePath = path.resolve(base, relativePath);
      ext = path.extname(filePath);
      data = fs.readFileSync(filePath);
      buffer = new Buffer(data);

      return types.String('"data:' + mime.lookup(extension) + ';base64,' + buffer.toString('base64') + '"');
    }
  };
};
