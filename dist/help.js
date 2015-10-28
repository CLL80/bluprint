'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _log = (0, _chip2['default'])();

exports['default'] = {
  print: function print() {
    console.log('Keywords:\n');
    console.log('generate: creates a new file according to its associated blueprint. \n');
    console.log('Description:\n');
    console.log('CLI app for easily creating and placing boilerplate code from predefined blueprints. \n');
    console.log('Examples:\n'.inverse.green);
    console.log('Creating a new component');
    console.log('bluprint generate component todos/list --pod \n'.white);
  },
  // helpers for printing to the console.
  log: function log(msg) {
    return _log.info(_chalk2['default'].green(msg));
  },
  info: function info(msg) {
    return _log.debug(_chalk2['default'].magenta(msg));
  },
  warn: function warn(msg) {
    return _log.warn(_chalk2['default'].yellow(msg));
  },
  error: function error(msg) {
    return _log.error(_chalk2['default'].red(msg));
  }
};
module.exports = exports['default'];