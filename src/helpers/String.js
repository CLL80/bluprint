import {
  upperCase,
  lowerCase,
  sentenceCase,
  titleCase,
  camelCase,
  pascalCase,
  snakeCase,
  paramCase,
  dotCase,
  pathCase,
  constantCase
} from 'change-case';
import inflection from 'inflection';

String.prototype.upperCase = function() {
  return upperCase(this);
};

String.prototype.lowerCase = function() {
  return lowerCase(this);
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.sentenceCase = function() {
  return sentenceCase(this);
};

String.prototype.titleCase = function() {
  return titleCase(this);
};

String.prototype.camelCase = function() {
  return camelCase(this);
};

String.prototype.pascalCase = function() {
  return pascalCase(this);
};

String.prototype.snakeCase = function() {
  return snakeCase(this);
};

String.prototype.paramCase = function() {
  return paramCase(this);
};

String.prototype.dotCase = function() {
  return dotCase(this);
};

String.prototype.pathCase = function() {
  return pathCase(this);
};

String.prototype.constantCase = function() {
  return upperCase(this);
};

String.prototype.plural = function() {
  return inflection.pluralize(this);
};

String.prototype.singular = function() {
  return inflection.singularize(this);
};

export default String;