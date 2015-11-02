import { uniq, drop } from 'lodash';

export default function replaceTemplateVariables(data, __templateToken__, callback) {
  var result = data;

  const templateVariables = uniq(data.match(/<%[^>]*%>/g).map(variable =>
    variable.substring(2, variable.length-2).trim()
  ));

  templateVariables.forEach(variable => {
    let args = variable.split(/\s+/);
    let token = __templateToken__; // should use args[0] to determine
    let mutations = drop(args);

    mutations.forEach(mutation => {
      if (typeof String.prototype[mutation] === 'function') {
        token = token[mutation]();
      } else {
        console.log(`${mutation} is not a recognized string mutation.`)
      }
    })

    let re = new RegExp(`<% ${variable} %>`, 'g');
    result = result.replace(re, token);
  });

  // NOTE: set result to undefined to prevent it from moving downstream
  callback(null, result);
}