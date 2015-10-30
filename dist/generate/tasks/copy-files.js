'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = copyFiles;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _smartStream = require('smart-stream');

var _smartStream2 = _interopRequireDefault(_smartStream);

var _replaceTemplateVariables = require('./replace-template-variables');

var _replaceTemplateVariables2 = _interopRequireDefault(_replaceTemplateVariables);

function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback) {
  blueprints.forEach(function (blueprint) {
    var fileName = __templateName__ ? __templateName__ + _path2['default'].extname(blueprint) : _path2['default'].basename(blueprint);
    var target = _path2['default'].join(__destinationDirectory__, fileName);

    var rd = _fs2['default'].createReadStream(blueprint, { encoding: 'utf8' });
    rd.on("error", function (err) {
      return error(err);
    });

    var wr = _fs2['default'].createWriteStream(target);
    wr.on("error", function (err) {
      return error(err);
    });
    wr.on("close", function () {
      return done(target);
    });

    var handleTemplateVariables = new _smartStream2['default'].SmartStream('ReplaceTemplateVariables');
    var __templateToken__ = __templateName__ ? _path2['default'].parse(fileName).name : __templateDirectory__;

    handleTemplateVariables.setMiddleware(function (data, callback) {
      return (0, _replaceTemplateVariables2['default'])(data, __templateToken__, callback);
    });

    rd.pipe(handleTemplateVariables).pipe(wr);
  });

  var error = function error(err) {
    return log.error(err);
  };
  var done = function done(target) {
    return callback(target);
  };
}

;
module.exports = exports['default'];