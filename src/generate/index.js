'use strict'

import mkdirp from 'mkdirp';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function generate(args) {
  const path = args[0];

  mkdirp('dummy/todos/index', (err) => {
    log('installing');
    if (err) {
      log.error(chalk.red('  failure') + ` ${path}`)
    } else {
      log.info(chalk.green('  create') + ` ${path}`)
    }
  });
}