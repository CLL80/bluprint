'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = replaceTemplateVariables;

var _lodash = require('lodash');

function replaceTemplateVariables(data, __templateToken__, callback) {
  var result = data;

  var templateVariables = (0, _lodash.uniq)(data.match(/<%[^>]*%>/g).map(function (variable) {
    return variable.substring(2, variable.length - 2).trim();
  }));

  templateVariables.forEach(function (variable) {
    var args = variable.split(/\s+/);
    var token = __templateToken__; // should use args[0] to determine
    var mutations = (0, _lodash.drop)(args);

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