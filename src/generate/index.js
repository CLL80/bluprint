'use strict'

import fs from 'fs';
import pathUtil from 'path';
import mkdirp from 'mkdirp';
import find from 'findit'

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function generate(args) {
  log('installing');

  const blueprintName = args[0];
  const blueprintsRoot = 'dummy/blueprints';

  const path = args[1];
  const destinationRoot = 'dummy/app';
  const destinationDirectory = `${destinationRoot}/${path}`;
  const destinationPath = `${destinationRoot}/${path}`;

  getBlueprints(blueprintsRoot, blueprintName, (blueprints) =>
    createDirectory(destinationDirectory, () =>
      copyFiles(blueprints, destinationDirectory)
    )
  );
};

const getBlueprints= (root, name, callback) => {
  const blueprintFinder = find(pathUtil.join(root, name));
  var blueprints = []

  blueprintFinder.on('file', file => {
    let fileName = pathUtil.parse(file).name;;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', () => {
    callback(blueprints)
  });
};

const createDirectory = (directory, callback) =>
    mkdirp(directory, {}, callback);

const copyFiles = (sources, targetDirectory, cb) => {
  sources.forEach(source => {
    const target = pathUtil.join(targetDirectory, pathUtil.basename(source));

    const rd = fs.createReadStream(source);
    rd.on("error", err => done(err));

    const wr = fs.createWriteStream(target);
    wr.on("error", err => done(err));
    wr.on("close", () => done());

    rd.pipe(wr);
  });

  const done = (err) => {
    if (err) { log.error(err); }
  }
};