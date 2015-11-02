import fs from 'fs';
import path from 'path';

// Example
//
// {
//   "forcePods": true
// }

export default function readConfig(__dir__, callback) {
  fs.readFile(path.join(__dir__, 'config.json'), 'utf8', function (err, data) {
    if (err) {
      callback({});
    } else {
      const options = Object.assign(
        {
          "forcePods": false
        },
        JSON.parse(data)
      );
      callback(options);
    }
  });
}