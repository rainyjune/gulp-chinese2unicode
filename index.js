var gutil = require('gulp-util');
var through = require('through2');

// Consts
const PLUGIN_NAME = 'gulp-chinese2unicode';

function toUnicode(s){
    return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\u3000-\u303F])/g, function(s){
        return '\\u' + s.charCodeAt(0).toString(16);
    });
}

module.exports = function (options) {
    gutil.log("Starting  'chinese2unicode' ...");

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var content = toUnicode(file.contents.toString());

        file.contents = new Buffer(content);

        this.push(file);

        cb();
    },function (){
        gutil.log("Finished 'chinese2unicode'");
    });
};