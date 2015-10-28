'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = generate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var log = (0, _chip2['default'])();

function generate(args) {
  var path = args[0];

  (0, _mkdirp2['default'])('dummy/todos/index', function (err) {
    log('installing');
    if (err) {
      log.error(_chalk2['default'].red('  failure') + (' ' + path));
    } else {
      log.info(_chalk2['default'].green('  create') + (' ' + path));
    }
  });
}

module.exports = exports['default'];