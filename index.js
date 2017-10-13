var htmlInlineImg = require('html-base64-image');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
const PLUGIN_NAME = 'gulp-html-base64-image';

function inlineImageProcessor(dir) {

  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      return cb();
    }
    if (file.isBuffer()) {
      file.contents = htmlInlineImg(file.contents, dir);
      this.push(file);
      return cb();
    }
    return cb(null, file); //no-op
  });

  return stream;
}

module.exports = inlineImageProcessor;
