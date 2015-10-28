#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

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
    console.log('GENERATE!!!');
  } else {
    _commander2['default'].help();
  }
}