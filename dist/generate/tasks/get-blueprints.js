'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getBlueprints;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _findit = require('findit');

var _findit2 = _interopRequireDefault(_findit);

function getBlueprints(__blueprintRoot__, __blueprintType__, callback) {
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
}

;
module.exports = exports['default'];