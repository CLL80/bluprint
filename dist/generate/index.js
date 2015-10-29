'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = generate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _findit = require('findit');

var _findit2 = _interopRequireDefault(_findit);

var _smartStream = require('smart-stream');

var _smartStream2 = _interopRequireDefault(_smartStream);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _tasksReplaceTemplateVariables = require('./tasks/replace-template-variables');

var _tasksReplaceTemplateVariables2 = _interopRequireDefault(_tasksReplaceTemplateVariables);

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
  getBlueprints(__blueprintRoot__, __blueprintType__, function (blueprints) {
    return createDirectory(__destinationDirectory__, function () {
      return copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, function (target) {
        return success(target);
      });
    });
  });
}

;

var getBlueprints = function getBlueprints(__blueprintRoot__, __blueprintType__, callback) {
  var blueprintFinder = (0, _findit2['default'])(_path2['default'].join(__blueprintRoot__, __blueprintType__));
  var blueprints = [];

  blueprintFinder.on('file', function (file) {
    var fileName = _path2['default'].parse(file).name;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', function () {
    callback(blueprints);
  });
};

var createDirectory = function createDirectory(__destinationDirectory__, callback) {
  return (0, _mkdirp2['default'])(__destinationDirectory__, {}, callback);
};

var copyFiles = function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback) {
  blueprints.forEach(function (blueprint) {
    var fileName = __templateName__ ? __templateName__ + _path2['default'].extname(blueprint) : _path2['default'].basename(blueprint);
    var target = _path2['default'].join(__destinationDirectory__, fileName);

    var rd = _fs2['default'].createReadStream(blueprint, { encoding: 'utf8' });
    rd.on("error", function (err) {
      return error(err);
    });

    var wr = _fs2['default'].createWriteStream(target);
    wr.on("error", function (err) {
      return error(err);
    });
    wr.on("close", function () {
      return done(target);
    });

    var handleTemplateVariables = new _smartStream2['default'].SmartStream('ReplaceTemplateVariables');
    var __TEMPLATE_TOKEN__ = __templateName__ ? _path2['default'].parse(fileName).name : __templateDirectory__;

    handleTemplateVariables.setMiddleware(function (data, callback) {
      return (0, _tasksReplaceTemplateVariables2['default'])(data, __TEMPLATE_TOKEN__, callback);
    });

    rd.pipe(handleTemplateVariables).pipe(wr);
  });

  var error = function error(err) {
    return log.error(err);
  };
  var done = function done(target) {
    return callback(target);
  };
};

var success = function success(target) {
  return log.info(_chalk2['default'].green('  create ') + target);
};
module.exports = exports['default'];