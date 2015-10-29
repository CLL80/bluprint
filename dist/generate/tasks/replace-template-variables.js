'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = replaceTemplateVariables;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function replaceTemplateVariables(data, __TEMPLATE_TOKEN__, callback) {
  var result = data;

  var templateVariables = _lodash2['default'].uniq(data.match(/<%[^>]*%>/g).map(function (variable) {
    return variable.substring(2, variable.length - 2).trim();
  }));

  templateVariables.forEach(function (variable) {
    var args = variable.split(/\s+/);
    var token = __TEMPLATE_TOKEN__; // should use args[0] to determine
    var mutations = _lodash2['default'].drop(args);

    mutations.forEach(function (mutation) {
      if (typeof String.prototype[mutation] === 'function') {
        token = token[mutation]();
      } else {
        console.log(mutation + ' is not a recognized string mutation.');
      }
    });

    var re = new RegExp('<% ' + variable + ' %>', 'g');
    result = result.replace(re, token);
  });

  // NOTE: set result to undefined to prevent it from moving downstream
  callback(null, result);
}

module.exports = exports['default'];