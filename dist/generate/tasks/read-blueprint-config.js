'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = readConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

// Example
//
// {
//   "forcePods": true
// }

function readConfig(__dir__, callback) {
  _fs2['default'].readFile(_path2['default'].join(__dir__, 'config.json'), 'utf8', function (err, data) {
    if (err) {
      callback({});
    } else {
      var options = Object.assign({
        "forcePods": false
      }, JSON.parse(data));
      callback(options);
    }
  });
}

module.exports = exports['default'];