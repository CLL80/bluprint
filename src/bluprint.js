#!/usr/bin/env node

'use strict'

import program from 'commander';
import pathUtil from 'path';
import _ from 'lodash';

import help from './help';
import generate from './generate';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.camelize = function() {
  return this.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  }).split(pathUtil.sep).join("");
};

String.prototype.titleCase = function() {
  return this.camelize().replace(/(^|\/)([a-z])/g, (match) => match.toUpperCase());
};

program
  .version('0.1.0')
  .usage('<keywords> [options]')
  .option('-p, --pods [pods flag]', 'Generates using the defined pods based file structure')
  .on('--help', () => help.print())
  .parse(process.argv);

const { args } = program;

const anyArgs = () => !!args.length;

if(!anyArgs()) {
  program.help();
} else {
  if (args[0] === "generate") {
    generate(_.drop(args));
  } else {
    program.help();
  }
}