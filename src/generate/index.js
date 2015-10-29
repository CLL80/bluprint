'use strict'

import fs from 'fs';
import pathUtil from 'path';
import mkdirp from 'mkdirp';
import find from 'findit'
import ss from 'smart-stream';
import inflection from 'inflection';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

const log = chip();

export default function generate(args) {
  const blueprintName = args[0];
  const blueprintsRoot = 'dummy/blueprints';

  const path = args[1];
  const template = args[2];

  const destinationRoot = 'dummy/app';
  const destinationDirectory = template ?
      `${destinationRoot}/${path}/${inflection.pluralize(blueprintName)}` :
      `${destinationRoot}/${path}`;
  const destinationPath = `${destinationRoot}/${path}`;

  log('installing ' + chalk.white(`${path} ${blueprintName}`));

  getBlueprints(blueprintsRoot, blueprintName, (blueprints) =>
    createDirectory(destinationDirectory, template, () =>
      copyFiles(blueprints, destinationDirectory, path, template, (target) =>
        success(target)
      )
    )
  );
};

const getBlueprints= (root, name, callback) => {
  const blueprintFinder = find(pathUtil.join(root, name));
  var blueprints = []

  blueprintFinder.on('file', file => {
    let fileName = pathUtil.parse(file).name;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', () => {
    callback(blueprints)
  });
};

const createDirectory = (directory, template, callback) =>
    mkdirp(directory, {}, callback);

const copyFiles = (sources, targetDirectory, path, template, callback) => {
  sources.forEach(source => {
    const fileName = template ?
        template + pathUtil.extname(source) :
        pathUtil.basename(source);
    const target = pathUtil.join(targetDirectory, fileName);

    const rd = fs.createReadStream(source, { encoding: 'utf8' });
    rd.on("error", err => error(err));

    const wr = fs.createWriteStream(target);
    wr.on("error", err => error(err));
    wr.on("close", () => done(target));

    const handleTemplateVariables = new ss.SmartStream('ReplaceTemplateVariables');
    const __PATH__ = template ? path + pathUtil.parse(fileName).name.capitalize() : path;

    handleTemplateVariables.setMiddleware((data, callback) =>
      replaceTemplateVariables(data, __PATH__, callback)
    );

    rd.pipe(handleTemplateVariables)
      .pipe(wr);
  });

  const error = err => log.error(err);
  const done = target => callback(target);
};

const copyFilesAsTypes = (source, targetDirectory, path, callback) => {

};

const replaceTemplateVariables = (data, path, callback) => {
  const result = data.replace(/<% PATH %>/g, path)
                     .replace(/<% PATH_CAMEL_CASE %>/g, path.camelize())
                     .replace(/<% PATH_TITLE_CASE %>/g, path.titleCase());

  callback(null, result);
  // NOTE: set result to undefined to prevent it from moving downstream
}

const success = (target) => log.info(chalk.green('  create ') + target);