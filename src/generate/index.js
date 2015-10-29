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

// Some example commands
//
// bluprint generate [component] [TodosList]
// The first argument is __blueprintType__
// The second argument is __templateName__
// The output is  __root__/__bluePrintTypePlur__/__templateName__
// or             __root__/components/TodosList
//
// bluprint generate [component] [todos/list] --pod
// The first argument is __blueprintType__
// The second argument is __templateDirectory__
// The output is  __root__/__podsRoot__/__templateDirectory__/__blueprintType__
// or             __root__/__podsRoot__/todos/list/component
//
// bluprint generate [component] [todos] [List] --pod
// The first argument is __blueprintType__
// The second argument is __templateDirectory__
// The third argument is __templateName__
// The output is  __root__/__podsRoot__/__templateDirectory__/__blueprintTypePlur__/__templateName__
// or             __root__/__podsRoot__/todos/components/List
//

export default function generate(args) {
  const usePods = true; // Temp

  // Needs to be defined via config
  const __destinationRoot__ = 'dummy/app';
  const __blueprintRoot__ = 'dummy/blueprints';

  // First argument is the type of blueprint we're generating
  const __blueprintType__ = args[0];
  const __blueprintTypePlur__ = inflection.pluralize(__blueprintType__)

  // If using types layout the second argument is the template name
  // Is using pods layout the second argument is the target directory

  // If using pods we accept template name as the third arguments
  // This allows us to create typed folders inside pods directories
  // i.e. todos/components
  const __templateName__ = usePods ? args[2] : args[1];
  const __templateDirectory__ = usePods ? args[1] : __blueprintTypePlur__;


  // Construct the destination directory
  // If using pods and supplied a template name we must include the typed
  // folder name in the structure
  const __destinationDirectory__ = usePods && __templateName__ ?
      pathUtil.join(__destinationRoot__, __templateDirectory__, __blueprintTypePlur__) :
      pathUtil.join(__destinationRoot__, __templateDirectory__);

  log('installing ' + chalk.white(`${__templateDirectory__} ${__blueprintType__}`));

  // Task flow
  getBlueprints(__blueprintRoot__, __blueprintType__, (blueprints) =>
    createDirectory(__destinationDirectory__, () =>
      copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, (target) =>
        success(target)
      )
    )
  );
};

const getBlueprints= (__root__, name, callback) => {
  const blueprintFinder = find(pathUtil.join(__root__, name));
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

const createDirectory = (__directory__,  callback) =>
    mkdirp(__directory__, {}, callback);

const copyFiles = (sources, __destinationDirectory__, __targetDirectory__, __templateName__, callback) => {
  sources.forEach(source => {
    const fileName = __templateName__ ?
        __templateName__ + pathUtil.extname(source) :
        pathUtil.basename(source);
    const target = pathUtil.join(__destinationDirectory__, fileName);

    const rd = fs.createReadStream(source, { encoding: 'utf8' });
    rd.on("error", err => error(err));

    const wr = fs.createWriteStream(target);
    wr.on("error", err => error(err));
    wr.on("close", () => done(target));

    const handleTemplateVariables = new ss.SmartStream('ReplaceTemplateVariables');
    const __PATH__ = __templateName__ ? pathUtil.parse(fileName).name : __targetDirectory__;

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