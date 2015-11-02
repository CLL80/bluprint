'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getBlueprints;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _findit = require('findit');

var _findit2 = _interopRequireDefault(_findit);

var _lodash = require('lodash');

function getBlueprints(__blueprintRoot__, __blueprintType__, callback) {
  var __blueprintDir__ = _path2['default'].join(__blueprintRoot__, __blueprintType__);
  var directoryFinder = (0, _findit2['default'])(__blueprintDir__);
  var blueprints = {
    root: {
      files: []
    }
  };

  directoryFinder.on('directory', function (dir) {
    if (dir !== __blueprintDir__) {
      var relativeDir = _path2['default'].basename(dir.replace(__blueprintDir__, ''));
      var keyHierarchy = relativeDir.replace(_path2['default'].sep, '.');

      (0, _lodash.set)(blueprints.root, keyHierarchy, { files: [] });
    }
  });

  directoryFinder.on('end', function () {
    var fileFinder = (0, _findit2['default'])(__blueprintDir__);

    fileFinder.on('file', function (file) {
      var fileName = _path2['default'].parse(file).name;

      if (fileName !== 'config') {
        var dir = _path2['default'].dirname(file);
        var relativeDir = _path2['default'].basename(dir.replace(__blueprintDir__, ''));
        var keyHierarchy = dir === __blueprintDir__ ? 'root.files' : 'root.' + relativeDir.replace(_path2['default'].sep, '.') + '.files';

        var currentFiles = (0, _lodash.get)(blueprints, keyHierarchy);
        (0, _lodash.set)(blueprints, keyHierarchy, [].concat(_toConsumableArray(currentFiles), [file]));
      }
    });

    fileFinder.on('end', function () {
      callback(blueprints);
    });
  });
}

;
module.exports = exports['default'];