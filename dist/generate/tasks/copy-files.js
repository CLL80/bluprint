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

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _replaceTemplateVariables = require('./replace-template-variables');

var _replaceTemplateVariables2 = _interopRequireDefault(_replaceTemplateVariables);

var _success = require('./success');

var _success2 = _interopRequireDefault(_success);

var log = (0, _chip2['default'])();

function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback) {
  var index = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

  var blueprint = blueprints[index];

  if (blueprint) {
    (function () {
      // Prepare arguments for next recursion
      var nextArgs = [blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index + 1];

      // If a blueprint exists for the current index
      var fileName = _path2['default'].basename(blueprint).replace('__TEMPLATE_TOKEN__', __templateName__);
      var target = _path2['default'].join(__destinationDirectory__, fileName);

      // Build template variable middleware
      var handleTemplateVariables = buildTemplateVariablesMiddleware(new _smartStream2['default'].SmartStream('ReplaceTemplateVariables'), __templateName__);

      // Prepare arguments for writeFromBlueprint
      var writeArgs = [blueprint, target, handleTemplateVariables, function () {
        return copyFiles.apply(undefined, nextArgs);
      }];

      _fs2['default'].stat(target, function (err, stat) {
        if (err == null) {
          // If a file at target already exists
          _promptly2['default'].confirm('[' + _chalk2['default'].green('?') + '] ' + _chalk2['default'].red('Overwrite') + ' ' + target + ' (Yn)', function (err, confirmed) {
            if (confirmed) {
              // If user confirms overwrite
              writeFromBlueprint.apply(undefined, writeArgs);
            } else {
              // If user denies overwrite
              log('  Skipping ' + _chalk2['default'].white(target));
              copyFiles.apply(undefined, nextArgs);
            }
          });
        } else {
          // If no file at target exists
          writeFromBlueprint.apply(undefined, writeArgs);
        }
      });
    })();
  } else {
    // If no blueprint exists for the current index, the recursion ends
    callback();
  }
}

;

var buildTemplateVariablesMiddleware = function buildTemplateVariablesMiddleware(stream, __templateToken__) {
  return stream.setMiddleware(function (data, callback) {
    return (0, _replaceTemplateVariables2['default'])(data, __templateToken__, callback);
  });
};

var writeFromBlueprint = function writeFromBlueprint(blueprint, target, handleTemplateVariables, callback) {
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
};

var error = function error(err) {
  return log.error(err);
};
var done = function done(target) {
  return (0, _success2['default'])(target);
};
module.exports = exports['default'];