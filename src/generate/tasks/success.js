import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function success(target) {
  log.info(chalk.green('  create ') + target);
};