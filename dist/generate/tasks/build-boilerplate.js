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

var _copyFiles = require('./copy-files');

var _copyFiles2 = _interopRequireDefault(_copyFiles);

function buildBoilerplate(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__) {
  createDirectory(__destinationDirectory__, blueprints.root, function (files, __dir__, subDirCallback) {
    return (0, _copyFiles2['default'])(files, __dir__, __templateDirectory__, __templateName__, subDirCallback);
  }, __templateName__);
}

function createDirectory(__dir__, dirObject, copyFilesCallback, templateName) {
  (0, _mkdirp2['default'])(__dir__, {}, function () {
    // After the directory is created we callback to copy files
    copyFilesCallback(dirObject.files, __dir__, function () {
      // If has sub directories we need to create those too
      var subDirectories = (0, _lodash.remove)(Object.keys(dirObject), function (n) {
        return n !== 'files';
      });

      subDirectories.forEach(function (key) {
        createDirectory(_path2['default'].join(__dir__, key === '__TEMPLATE_TOKEN__' && templateName ? templateName : key), dirObject[key], copyFilesCallback);
      });
    });
  });
}
module.exports = exports['default'];