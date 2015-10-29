'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = generate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _findit = require('findit');

var _findit2 = _interopRequireDefault(_findit);

var _smartStream = require('smart-stream');

var _smartStream2 = _interopRequireDefault(_smartStream);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var log = (0, _chip2['default'])();

function generate(args) {
  var blueprintName = args[0];
  var blueprintsRoot = 'dummy/blueprints';

  var path = args[1];
  var template = args[2];

  var destinationRoot = 'dummy/app';
  var destinationDirectory = template ? destinationRoot + '/' + path + '/' + _inflection2['default'].pluralize(blueprintName) : destinationRoot + '/' + path;
  var destinationPath = destinationRoot + '/' + path;

  log('installing ' + _chalk2['default'].white(path + ' ' + blueprintName));

  getBlueprints(blueprintsRoot, blueprintName, function (blueprints) {
    return createDirectory(destinationDirectory, template, function () {
      return copyFiles(blueprints, destinationDirectory, path, template, function (target) {
        return success(target);
      });
    });
  });
}

;

var getBlueprints = function getBlueprints(root, name, callback) {
  var blueprintFinder = (0, _findit2['default'])(_path2['default'].join(root, name));
  var blueprints = [];

  blueprintFinder.on('file', function (file) {
    var fileName = _path2['default'].parse(file).name;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', function () {
    callback(blueprints);
  });
};

var createDirectory = function createDirectory(directory, template, callback) {
  return (0, _mkdirp2['default'])(directory, {}, callback);
};

var copyFiles = function copyFiles(sources, targetDirectory, path, template, callback) {
  sources.forEach(function (source) {
    var fileName = template ? template + _path2['default'].extname(source) : _path2['default'].basename(source);
    var target = _path2['default'].join(targetDirectory, fileName);

    var rd = _fs2['default'].createReadStream(source, { encoding: 'utf8' });
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
    var __PATH__ = template ? path + _path2['default'].parse(fileName).name.capitalize() : path;

    handleTemplateVariables.setMiddleware(function (data, callback) {
      return replaceTemplateVariables(data, __PATH__, callback);
    });

    rd.pipe(handleTemplateVariables).pipe(wr);
  });

  var error = function error(err) {
    return log.error(err);
  };
  var done = function done(target) {
    return callback(target);
  };
};

var copyFilesAsTypes = function copyFilesAsTypes(source, targetDirectory, path, callback) {};

var replaceTemplateVariables = function replaceTemplateVariables(data, path, callback) {
  var result = data.replace(/<% PATH %>/g, path).replace(/<% PATH_CAMEL_CASE %>/g, path.camelize()).replace(/<% PATH_TITLE_CASE %>/g, path.titleCase());

  callback(null, result);
  // NOTE: set result to undefined to prevent it from moving downstream
};

var success = function success(target) {
  return log.info(_chalk2['default'].green('  create ') + target);
};
module.exports = exports['default'];