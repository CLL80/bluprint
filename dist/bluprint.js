#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

_commander2['default'].version('0.1.0').usage('<keywords> [options]').option('-p, --pods [pods flag]', 'Generates using the defined pods based file structure').on('--help', function () {
  return _help2['default'].print();
}).parse(process.argv);

var anyArgs = function anyArgs() {
  return !!_commander2['default'].args.length;
};

if (!anyArgs()) {
  _commander2['default'].help();
} else {
  if (_commander2['default'].args[0] === "generate") {
    _generate2['default'].apply(undefined, _toConsumableArray(_lodash2['default'].drop(_commander2['default'].args)));
  } else {
    _commander2['default'].help();
  }
}