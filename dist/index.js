#!/usr/bin/env node


'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _changeCase = require('change-case');

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _readConfig = require('./read-config');

var _readConfig2 = _interopRequireDefault(_readConfig);

var _globalConfigDefaults = require('./global-config-defaults');

var _globalConfigDefaults2 = _interopRequireDefault(_globalConfigDefaults);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

String.prototype.upperCase = function () {
  return (0, _changeCase.upperCase)(this);
};

String.prototype.lowerCase = function () {
  return (0, _changeCase.lowerCase)(this);
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.sentenceCase = function () {
  return (0, _changeCase.sentenceCase)(this);
};

String.prototype.titleCase = function () {
  return (0, _changeCase.titleCase)(this);
};

String.prototype.camelCase = function () {
  return (0, _changeCase.camelCase)(this);
};

String.prototype.pascalCase = function () {
  return (0, _changeCase.pascalCase)(this);
};

String.prototype.snakeCase = function () {
  return (0, _changeCase.snakeCase)(this);
};

String.prototype.paramCase = function () {
  return (0, _changeCase.paramCase)(this);
};

String.prototype.dotCase = function () {
  return (0, _changeCase.dotCase)(this);
};

String.prototype.pathCase = function () {
  return (0, _changeCase.pathCase)(this);
};

String.prototype.constantCase = function () {
  return (0, _changeCase.upperCase)(this);
};

String.prototype.plural = function () {
  return _inflection2['default'].pluralize(this);
};

String.prototype.singular = function () {
  return _inflection2['default'].singularize(this);
};

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