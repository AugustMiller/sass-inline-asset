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

      // Fetch filename/path argument
      relativePath = './' + file.getValue();

      // Resolve absolute path
      filePath = path.resolve(base, relativePath);

      // Pop the extension for use in mime lookup
      extension = path.extname(filePath);

      // Read data from file
      data = fs.readFileSync(filePath);

      // Buffers can transform data into various encodings
      buffer = new Buffer(data);

      // Build and return the full data-url
      return types.String('"data:' + mime.lookup(extension) + ';base64,' + buffer.toString('base64') + '"');
    }
  };
};
