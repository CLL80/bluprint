'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createDirectory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function createDirectory(blueprints, __destinationDirectory__, callback) {
  var hasSubDirectories = Object.keys(blueprints.root).length !== 0;
  var rootCallback = hasSubDirectories ? function (subDir) {
    return console.log('test');
  } : callback;

  (0, _mkdirp2['default'])(__destinationDirectory__, {}, rootCallback);
}

module.exports = exports['default'];