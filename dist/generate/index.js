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

  var blueprintsRoot = 'dummy/blueprints';
  var blueprintName = args[0];

  var path = args[1];
  var destinationRoot = 'dummy/app';
  var destinationDirectory = destinationRoot + '/' + _path2['default'].dirname(path);
  var destinationPath = destinationRoot + '/' + path;

  getBlueprintPath(blueprintsRoot, blueprintName, function (blueprintPath) {
    return createDirectory(destinationDirectory, function () {
      return copyFile(blueprintPath, destinationPath);
    });
  });
}

;

var getBlueprintPath = function getBlueprintPath(root, name, callback) {
  var blueprintFinder = (0, _findit2['default'])(root);

  blueprintFinder.on('file', function (file) {
    var fileName = _path2['default'].parse(file).name;

    if (fileName === name) {
      callback(file);
    }
  });
};

var createDirectory = function createDirectory(directory, callback) {
  return (0, _mkdirp2['default'])(directory, {}, callback);
};

var copyFile = function copyFile(source, targetPath, cb) {
  var target = targetPath + _path2['default'].extname(source);

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

  var done = function done(err) {
    if (err) {
      log.error(err);
    }
  };
};
module.exports = exports['default'];