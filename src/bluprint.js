#!/usr/bin/env node

import program from 'commander';

import help from './help';

program
  .version('0.1.0')
  .usage('<keywords> [options]')
  .option('-p, --pods [pods flag]', 'Generates using the defined pods based file structure')
  .on('--help', () => help.print())
  .parse(process.argv);

const anyArgs = () => !!program.args.length;

if(!anyArgs()) {
  program.help();
} else {
  if (program.args[0] === "generate") {
    console.log('GENERATE!!!');
  } else {
    program.help();
  }
}