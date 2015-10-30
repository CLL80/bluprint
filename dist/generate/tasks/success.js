'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = success;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var log = (0, _chip2['default'])();

function success(target) {
  log.info(_chalk2['default'].green('  create ') + target);
}

;
module.exports = exports['default'];