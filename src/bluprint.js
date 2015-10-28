#!/usr/bin/env node

import program from 'commander';
import _ from 'lodash';

import help from './help';
import generate from './generate';

program
  .version('0.1.0')
  .usage('<keywords> [options]')
  .option('-p, --pods [pods flag]', 'Generates using the defined pods based file structure')
  .on('--help', () => help.print())
  .parse(process.argv);

const { args, help } = program;

const anyArgs = () => !!args.length;

if(!anyArgs()) {
  help();
} else {
  if (args[0] === "generate") {
    generate(..._.drop(args));
  } else {
    help();
  }
}