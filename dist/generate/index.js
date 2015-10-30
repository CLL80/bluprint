'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = generate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _tasksGetBlueprints = require('./tasks/get-blueprints');

var _tasksGetBlueprints2 = _interopRequireDefault(_tasksGetBlueprints);

var _tasksCreateDirectory = require('./tasks/create-directory');

var _tasksCreateDirectory2 = _interopRequireDefault(_tasksCreateDirectory);

var _tasksCopyFiles = require('./tasks/copy-files');

var _tasksCopyFiles2 = _interopRequireDefault(_tasksCopyFiles);

var _tasksSuccess = require('./tasks/success');

var _tasksSuccess2 = _interopRequireDefault(_tasksSuccess);

var log = (0, _chip2['default'])();

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

function generate(args, usePods) {
  // Needs to be defined via config
  var __destinationRoot__ = 'dummy/app';
  var __blueprintRoot__ = 'dummy/blueprints';

  // First argument is the type of blueprint we're generating
  var __blueprintType__ = args[0];
  var __blueprintTypePlur__ = __blueprintType__.plural();

  // If using types layout the second argument is the template name
  // Is using pods layout the second argument is the target directory

  // If using pods we accept template name as the third arguments
  // This allows us to create typed folders inside pods directories
  // i.e. todos/components
  var __templateName__ = usePods ? args[2] : args[1];
  var __templateDirectory__ = usePods ? args[1] : __blueprintTypePlur__;

  // Construct the destination directory
  // If using pods and supplied a template name we must include the typed
  // folder name in the structure
  var __destinationDirectory__ = usePods && __templateName__ ? _path2['default'].join(__destinationRoot__, __templateDirectory__, __blueprintTypePlur__) : _path2['default'].join(__destinationRoot__, __templateDirectory__);

  var __logPath__ = usePods && __templateName__ ? __templateDirectory__ + ' ' + __templateName__ : __templateName__ || __templateDirectory__;
  log('installing ' + _chalk2['default'].white(__blueprintType__ + ' ' + __logPath__));

  // Task flow
  (0, _tasksGetBlueprints2['default'])(__blueprintRoot__, __blueprintType__, function (blueprints) {
    return (0, _tasksCreateDirectory2['default'])(__destinationDirectory__, function () {
      return (0, _tasksCopyFiles2['default'])(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, function (target) {
        return (0, _tasksSuccess2['default'])(target);
      });
    });
  });
}

;
module.exports = exports['default'];