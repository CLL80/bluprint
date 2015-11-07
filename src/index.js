#!/usr/bin/env node

'use strict'

import program from 'commander';
import path from 'path';
import { drop } from 'lodash';

import String from './helpers/String';

import help from './help';
import generate from './generate';
import readConfig from './tasks/read-config';
import globalConfigDefaults from './config/global-defaults';

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