import path from 'path';
import find from 'findit'
import { set, get } from 'lodash';

export default function serializeBlueprints(__blueprintRoot__, __blueprintType__, callback) {
  const __blueprintDir__ = path.join(__blueprintRoot__, __blueprintType__);
  const directoryFinder = find(__blueprintDir__);
  var blueprints = {
    root: {
      files: []
    }
  };

  directoryFinder.on('directory', dir => {
    if (dir !== __blueprintDir__) {
      let relativeDir = dir.replace(__blueprintDir__, '').replace(/^\//, '');
      let keyHierarchy = relativeDir.replace(path.sep, '.');

      set(blueprints.root, keyHierarchy, { files: [] });
    }
  });

  directoryFinder.on('end', () => {
    const fileFinder = find(__blueprintDir__);

    fileFinder.on('file', file => {
      let fileName = path.parse(file).name;


      if (fileName !== 'config') {
        let dir = path.dirname(file);
        let relativeDir = dir.replace(__blueprintDir__, '').replace(/^\//, '');
        let keyHierarchy = dir === __blueprintDir__ ?
            'root.files' :
            `root.${relativeDir.replace(path.sep, '.')}.files`;

        let currentFiles = get(blueprints, keyHierarchy);
        set(blueprints, keyHierarchy, [...currentFiles, file]);
      }
    });

    fileFinder.on('end', () => {
      callback(blueprints)
    });
  })
};