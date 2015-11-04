import mkdirp from 'mkdirp';
import path from 'path';
import { remove } from 'lodash';

import copyFiles from './copy-files';

export default function buildBoilerplate(blueprints, __destinationDirectory__,  __templateDirectory__, __templateName__) {
  createDirectory(__destinationDirectory__, blueprints.root, (files, __dir__, subDirCallback) =>
    copyFiles(files, __dir__, __templateDirectory__, __templateName__, subDirCallback)
  );
}

function createDirectory(__dir__, dirObject, copyFilesCallback) {
  mkdirp(__dir__, {}, () => {
    // After the directory is created we callback to copy files
    copyFilesCallback(dirObject.files, __dir__, () => {
      // If has sub directories we need to create those too
      let subDirectories = remove(Object.keys(dirObject), n => n !== 'files');

      subDirectories.forEach(key =>
        createDirectory(path.join(__dir__, key), dirObject[key], copyFilesCallback)
      );
    });
  });
}