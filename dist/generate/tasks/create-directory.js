'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = buildBoilerplate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _copyFiles = require('./copy-files');

var _copyFiles2 = _interopRequireDefault(_copyFiles);

function buildBoilerplate(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__) {
  createDirectory(__destinationDirectory__, blueprints.root, function (files, __dir__) {
    return (0, _copyFiles2['default'])(files, __dir__, __templateDirectory__, __templateName__);
  });
}

function createDirectory(__dir__, dirObject, callback) {
  (0, _mkdirp2['default'])(__dir__, {}, function () {
    // After the directory is created we callback to write files
    callback(dirObject.files, __dir__);

    // If has sub directories we need to create those too
    var subDirectories = _lodash2['default'].remove(Object.keys(dirObject), function (n) {
      return n !== 'files';
    });

    subDirectories.forEach(function (key) {
      return createDirectory(_path2['default'].join(__dir__, key), dirObject[key], callback);
    });
  });
}
module.exports = exports['default'];