'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createDirectory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function createDirectory(__destinationDirectory__, callback) {
  (0, _mkdirp2['default'])(__destinationDirectory__, {}, callback);
}

module.exports = exports['default'];