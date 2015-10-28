import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default {
  print: () => {
    console.log('Keywords:\n');
    console.log('generate: creates a new file according to its associated blueprint. \n');
    console.log('Description:\n');
    console.log('CLI app for easily creating and placing boilerplate code from predefined blueprints. \n');
    console.log('Examples:\n'.inverse.green);
    console.log('Creating a new component');
    console.log('bluprint generate component todos/list --pod \n'.white);
  },
  // helpers for printing to the console.
  log: (msg) => log.info(chalk.green(msg)),
  info: (msg) => log.debug(chalk.magenta(msg)),
  warn: (msg) => log.warn(chalk.yellow(msg)),
  error: (msg) => log.error(chalk.red(msg))
};