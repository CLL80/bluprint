import mkdirp from 'mkdirp';
import path from 'path';
import _ from 'lodash';

export default function createDirectory(blueprints, __destinationDirectory__,  callback) {
  const hasSubDirectories = blueprints.root.length !== 0;
  const rootCallback = hasSubDirectories ? (subDir) =>
      _.forEach(subDir, (n, key) => {
         console.log(key);
      }) :
      callback;

  mkdirp(__destinationDirectory__, {}, rootCallback);
}