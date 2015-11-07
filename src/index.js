#!/usr/bin/env node

'use strict'

import program from 'commander';
import path from 'path';
import { drop } from 'lodash';
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

import readConfig from './read-config';
import globalConfigDefaults from './global-config-defaults';
import help from './help';
import generate from './generate';

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

program
  .version('0.1.0')
  .usage('<keywords> [options]')
  .option('-p, --pod [pods flag]', 'Generates using the defined pods based file structure')
  .option('--pods [pods flag alias]', 'Generates using the defined pods based file structure')
  .on('--help', () => help.print())
  .parse(process.argv);

const { args, pods, pod } = program;
const podsFlag = pod || pods;

const anyArgs = () => !!args.length;

readConfig('./.bluprintconfig', configOptions => {
  if(!anyArgs()) {
    program.help();
  } else {
    if (args[0] === "generate") {
      generate(drop(args), podsFlag, configOptions);
    } else {
      program.help();
    }
  }
}, globalConfigDefaults);