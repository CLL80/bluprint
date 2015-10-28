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

  const blueprintsRoot = 'dummy/blueprints';
  const blueprintName = args[0];

  const path = args[1];
  const destinationRoot = 'dummy/app';
  const destinationDirectory = `${destinationRoot}/${pathUtil.dirname(path)}`;
  const destinationPath = `${destinationRoot}/${path}`;

  getBlueprintPath(blueprintsRoot, blueprintName, (blueprintPath) =>
    createDirectory(destinationDirectory, () =>
      copyFile(blueprintPath, destinationPath)
    )
  );
};

const getBlueprintPath = (root, name, callback) => {
  const blueprintFinder = find(root);

  blueprintFinder.on('file', file => {
    let fileName = pathUtil.parse(file).name;

    if (fileName === name) {
      callback(file);
    }
  });
};

const createDirectory = (directory, callback) =>
    mkdirp(directory, {}, callback);

const copyFile = (source, targetPath, cb) => {
  const target = targetPath + pathUtil.extname(source);

  const rd = fs.createReadStream(source);
  rd.on("error", err => done(err));

  const wr = fs.createWriteStream(target);
  wr.on("error", err => done(err));
  wr.on("close", () => done());

  rd.pipe(wr);

  const done = (err) => {
    if (err) { log.error(err); }
  }
};