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

function readConfig(callback) {
  _fs2['default'].readFile('./.bluprintconfig', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now

    var options = Object.assign({
      "rootDirectory": "app",
      "blueprintsDirectory": "blueprints"
    }, JSON.parse(data));

    callback(options);
  });
}

module.exports = exports['default'];