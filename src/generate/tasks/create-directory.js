import mkdirp from 'mkdirp';

export default function createDirectory(__destinationDirectory__,  callback) {
  mkdirp(__destinationDirectory__, {}, callback);
}