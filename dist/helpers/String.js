'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _changeCase = require('change-case');

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

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

exports['default'] = String;
module.exports = exports['default'];