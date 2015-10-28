'use strict'

import pathUtil from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function generate(args) {
  log('installing');

  const blueprint = args[0];

  const path = args[1];
  const destinationRoot = 'dummy/app';
  const directory = `${destinationRoot}/${pathUtil.dirname(path)}`;
  const fileName =  `${destinationRoot}/${path}.js`;

  createDirectory(directory, createFile(fileName));
}

const createDirectory = (directory, callback) => mkdirp(directory, {}, callback);

const createFile = (fileName, callback) =>
    fs.exists(fileName, function (exists) {
      if(exists){
          console.log('already exists');
      } else {
          fs.writeFile(fileName, 'YESSSS');
          log.info(chalk.green('  create ') + fileName);
      }
    });