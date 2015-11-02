#!/usr/bin/env node


'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.camelize = function () {
  return this.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  }).split(_path2['default'].sep).join("");
};

String.prototype.uppercase = function () {
  return this.toUpperCase();
};

String.prototype.titleCase = function () {
  return this.camelize().replace(/(^|\/)([a-z])/g, function (match) {
    return match.toUpperCase();
  });
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

var usePods = pod || pods;

var anyArgs = function anyArgs() {
  return !!args.length;
};

if (!anyArgs()) {
  _commander2['default'].help();
} else {
  if (args[0] === "generate") {
    (0, _generate2['default'])((0, _lodash.drop)(args), usePods);
  } else {
    _commander2['default'].help();
  }
}