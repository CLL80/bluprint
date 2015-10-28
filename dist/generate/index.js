'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = generate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chip = require('chip');

var _chip2 = _interopRequireDefault(_chip);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var log = (0, _chip2['default'])();

function generate(args) {
    log('installing');

    var path = args[0];
    var destinationRoot = 'dummy/app';
    var directory = destinationRoot + '/' + _path2['default'].dirname(path);
    var fileName = destinationRoot + '/' + path + '.js';

    createDirectory(directory, createFile(fileName));
}

var createDirectory = function createDirectory(directory, callback) {
    return (0, _mkdirp2['default'])(directory, {}, callback);
};

var createFile = function createFile(fileName, callback) {
    return _fs2['default'].exists(fileName, function (exists) {
        if (exists) {
            console.log('already exists');
        } else {
            _fs2['default'].writeFile(fileName, 'YESSSS');
            log.info(_chalk2['default'].green('  create ') + fileName);
        }
    });
};
module.exports = exports['default'];