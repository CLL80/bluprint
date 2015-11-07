'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = readConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

// Example
//
// {
//   "rootDirectory": "dummy/app",
//   "podsDirectory": "pods",
//   "blueprintsDirectory": "dummy/pods"
// }

function readConfig(__dir__, callback) {
  var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  _fs2['default'].readFile(__dir__, 'utf8', function (err, data) {
    if (err) {
      callback(defaults);
    } else {
      var options = Object.assign(defaults, JSON.parse(data));

      callback(options);
    }
  });
}

module.exports = exports['default'];