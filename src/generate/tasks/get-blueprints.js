import path from 'path';
import find from 'findit'

export default function getBlueprints(__blueprintRoot__, __blueprintType__, callback) {
  const blueprintFinder = find(path.join(__blueprintRoot__, __blueprintType__));
  var blueprints = []

  blueprintFinder.on('file', file => {
    let fileName = path.parse(file).name;

    if (fileName !== 'config') {
      blueprints.push(file);
    }
  });

  blueprintFinder.on('end', () => {
    callback(blueprints)
  });
};