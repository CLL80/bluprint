'use strict'

import fs from 'fs';
import pathUtil from 'path';
import mkdirp from 'mkdirp';
import find from 'findit'
import ss from 'smart-stream';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function generate(args) {
  const blueprintName = args[0];
  const blueprintsRoot = 'dummy/blueprints';

  const path = args[1];
  const destinationRoot = 'dummy/app';
  const destinationDirectory = `${destinationRoot}/${path}`;
  const destinationPath = `${destinationRoot}/${path}`;

  log('installing ' + chalk.white(`${path} ${blueprintName}`));

  getBlueprints(blueprintsRoot, blueprintName, (blueprints) =>
    createDirectory(destinationDirectory, () =>
      copyFiles(blueprints, destinationDirectory, path, (target) =>
        success(target)
      )
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

const copyFiles = (sources, targetDirectory, path, callback) => {
  sources.forEach(source => {
    const target = pathUtil.join(targetDirectory, pathUtil.basename(source));

    const rd = fs.createReadStream(source, { encoding: 'utf8' });
    rd.on("error", err => error(err));

    const wr = fs.createWriteStream(target);
    wr.on("error", err => error(err));
    wr.on("close", () => done(target));

    const handleTemplateVariables = new ss.SmartStream('ReplaceTemplateVariables');

    handleTemplateVariables.setMiddleware((data, callback) =>
      replaceTemplateVariables(data, path, callback)
    );

    rd.pipe(handleTemplateVariables)
      .pipe(wr);
  });

  const error = err => log.error(err);
  const done = target => callback(target);
};

const replaceTemplateVariables = (data, path, callback) => {
  const result = data.replace(/<% PATH %>/g, path)
                     .replace(/<% PATH_CAMEL_CASE %>/g, path.camelize())
                     .replace(/<% PATH_TITLE_CASE %>/g, path.titleCase());

  callback(null, result);
  // NOTE: set result to undefined to prevent it from moving downstream
}

const success = (target) => log.info(chalk.green('  create ') + target);