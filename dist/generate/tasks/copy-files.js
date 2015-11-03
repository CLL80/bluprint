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

var _promptly = require('promptly');

var _promptly2 = _interopRequireDefault(_promptly);

var _replaceTemplateVariables = require('./replace-template-variables');

var _replaceTemplateVariables2 = _interopRequireDefault(_replaceTemplateVariables);

var _success = require('./success');

var _success2 = _interopRequireDefault(_success);

function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback) {
  var index = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

  var blueprint = blueprints[index];

  if (blueprint) {
    (function () {
      // If a blueprint existes for the current index
      var fileName = __templateName__ ? __templateName__ + _path2['default'].extname(blueprint) : _path2['default'].basename(blueprint);
      var target = _path2['default'].join(__destinationDirectory__, fileName);

      var handleTemplateVariables = new _smartStream2['default'].SmartStream('ReplaceTemplateVariables');
      var __templateToken__ = __templateName__ ? _path2['default'].parse(fileName).name : __templateDirectory__;

      handleTemplateVariables.setMiddleware(function (data, middlewareCallback) {
        return (0, _replaceTemplateVariables2['default'])(data, __templateToken__, middlewareCallback);
      });

      _fs2['default'].stat(target, function (err, stat) {
        if (err == null) {
          // If a file at target already exists
          _promptly2['default'].confirm('Overwrite ' + target + '?', function (err, confirmed) {
            if (confirmed) {
              // If user confirms overwrite
              writeFromBlueprint(blueprint, target, handleTemplateVariables, function () {
                return copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index + 1);
              });
            } else {
              // If user denies overwrite
              console.log('Skipping ' + target);

              copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index + 1);
            }
          });
        } else {
          // If no file at target exists
          writeFromBlueprint(blueprint, target, handleTemplateVariables, function () {
            return copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index + 1);
          });
        }
      });
    })();
  } else {
    // If no blueprint exists for the current index
    callback();
  }
}

;

function writeFromBlueprint(blueprint, target, handleTemplateVariables, callback) {
  var rd = _fs2['default'].createReadStream(blueprint, { encoding: 'utf8' });
  rd.on("error", function (err) {
    return error(err);
  });

  var wr = _fs2['default'].createWriteStream(target);
  wr.on("error", function (err) {
    return error(err);
  });
  wr.on("close", function () {
    done(target);
    callback();
  });

  rd.pipe(handleTemplateVariables).pipe(wr);
}

var error = function error(err) {
  return log.error(err);
};
var done = function done(target) {
  return (0, _success2['default'])(target);
};
module.exports = exports['default'];