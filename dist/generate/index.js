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
  log('installing');

  var blueprintName = args[0];
  var blueprintsRoot = 'dummy/blueprints';

  var path = args[1];
  var destinationRoot = 'dummy/app';
  var destinationDirectory = destinationRoot + '/' + path;
  var destinationPath = destinationRoot + '/' + path;

  getBlueprints(blueprintsRoot, blueprintName, function (blueprints) {
    return createDirectory(destinationDirectory, function () {
      return copyFiles(blueprints, destinationDirectory);
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

var copyFiles = function copyFiles(sources, targetDirectory, cb) {
  sources.forEach(function (source) {
    var target = _path2['default'].join(targetDirectory, _path2['default'].basename(source));

    var rd = _fs2['default'].createReadStream(source);
    rd.on("error", function (err) {
      return done(err);
    });

    var wr = _fs2['default'].createWriteStream(target);
    wr.on("error", function (err) {
      return done(err);
    });
    wr.on("close", function () {
      return done();
    });

    rd.pipe(wr);
  });

  var done = function done(err) {
    if (err) {
      log.error(err);
    }
  };
};
module.exports = exports['default'];