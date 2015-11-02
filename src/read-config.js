import fs from 'fs';

// Example
//
// {
//   "rootDirectory": "dummy/app",
//   "podsDirectory": "pods",
//   "blueprintsDirectory": "dummy/pods"
// }

export default function readConfig(__dir__, callback, defaults = {}) {
  fs.readFile(__dir__, 'utf8', function (err, data) {
    if (err) {
      callback(defaults)
    } else {
      const options = Object.assign(
        defaults,
        JSON.parse(data)
      );

      callback(options);
    }
  });
}