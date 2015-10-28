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
  var destinationRoot = 'dummy/app';
  var destinationDirectory = destinationRoot + '/' + path;
  var destinationPath = destinationRoot + '/' + path;

  log('installing ' + _chalk2['default'].white(path + ' ' + blueprintName));

  getBlueprints(blueprintsRoot, blueprintName, function (blueprints) {
    return createDirectory(destinationDirectory, function () {
      return copyFiles(blueprints, destinationDirectory, function (target) {
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
    var fileName = _path2['default'].parse(file).name;;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', function () {
    callback(blueprints);
  });
};

var createDirectory = function createDirectory(directory, callback) {
  return (0, _mkdirp2['default'])(directory, {}, callback);
};

var copyFiles = function copyFiles(sources, targetDirectory, callback) {
  sources.forEach(function (source) {
    var target = _path2['default'].join(targetDirectory, _path2['default'].basename(source));

    var rd = _fs2['default'].createReadStream(source);
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

    rd.pipe(wr);
  });

  var error = function error(err) {
    return log.error(err);
  };
  var done = function done(target) {
    return callback(target);
  };
};

var success = function success(target) {
  return log.info(_chalk2['default'].green('  create ') + target);
};
module.exports = exports['default'];