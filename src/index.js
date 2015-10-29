#!/usr/bin/env node

'use strict'

import program from 'commander';
import path from 'path';
import _ from 'lodash';
import inflection from 'inflection';

import help from './help';
import generate from './generate';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.camelize = function() {
  return this.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  }).split(path.sep).join("");
};

String.prototype.uppercase = function() {
    return this.toUpperCase();
};

String.prototype.titleCase = function() {
  return this.camelize().replace(/(^|\/)([a-z])/g, (match) => match.toUpperCase());
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
const usePods = pod || pods;

const anyArgs = () => !!args.length;

if(!anyArgs()) {
  program.help();
} else {
  if (args[0] === "generate") {
    generate(_.drop(args), usePods);
  } else {
    program.help();
  }
}