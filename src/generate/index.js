'use strict'

import path from 'path';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

import getBlueprints from './tasks/get-blueprints';
import createDirectory from './tasks/create-directory';
import copyFiles from './tasks/copy-files';
import success from './tasks/success';

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

export default function generate(args, usePods) {
  // Needs to be defined via config
  const __destinationRoot__ = 'dummy/app';
  const __blueprintRoot__ = 'dummy/blueprints';

  // First argument is the type of blueprint we're generating
  const __blueprintType__ = args[0];
  const __blueprintTypePlur__ = __blueprintType__.plural()

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
      path.join(__destinationRoot__, __templateDirectory__, __blueprintTypePlur__) :
      path.join(__destinationRoot__, __templateDirectory__);

  const __logPath__ = usePods && __templateName__ ?
      `${__templateDirectory__} ${ __templateName__}` :
      __templateName__ || __templateDirectory__;
  log('installing ' + chalk.white(`${__blueprintType__} ${__logPath__}`));

  // Task flow
  getBlueprints(__blueprintRoot__, __blueprintType__, (blueprints) =>
    createDirectory(blueprints, __destinationDirectory__, () => true
      /*copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, (target) =>
        success(target)
      )*/
    )
  );
};
