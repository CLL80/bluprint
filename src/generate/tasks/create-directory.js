import mkdirp from 'mkdirp';
import path from 'path';
import _ from 'lodash';

export default function createDirectory(blueprints, __destinationDirectory__,  callback) {
  const hasSubDirectories = Object.keys(blueprints.root).length !== 0;
  const rootCallback = hasSubDirectories ? (subDir) =>
      console.log('test'):
      callback;

  mkdirp(__destinationDirectory__, {}, rootCallback);
}