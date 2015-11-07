#!/usr/bin/env node


'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _helpersString = require('./helpers/String');

var _helpersString2 = _interopRequireDefault(_helpersString);

var _readConfig = require('./read-config');

var _readConfig2 = _interopRequireDefault(_readConfig);

var _globalConfigDefaults = require('./global-config-defaults');

var _globalConfigDefaults2 = _interopRequireDefault(_globalConfigDefaults);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

_commander2['default'].version('0.1.0').usage('<keywords> [options]').option('-p, --pod [pods flag]', 'Generates using the defined pods based file structure').option('--pods [pods flag alias]', 'Generates using the defined pods based file structure').on('--help', function () {
  return _help2['default'].print();
}).parse(process.argv);

var args = _commander2['default'].args;
var pods = _commander2['default'].pods;
var pod = _commander2['default'].pod;

var podsFlag = pod || pods;

var anyArgs = function anyArgs() {
  return !!args.length;
};

(0, _readConfig2['default'])('./.bluprintconfig', function (configOptions) {
  if (!anyArgs()) {
    _commander2['default'].help();
  } else {
    if (args[0] === "generate") {
      (0, _generate2['default'])((0, _lodash.drop)(args), podsFlag, configOptions);
    } else {
      _commander2['default'].help();
    }
  }
}, _globalConfigDefaults2['default']);