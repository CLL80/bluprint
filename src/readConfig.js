import fs from 'fs';

// Example
//
// {
//   "rootDirectory": "dummy/app",
//   "podsDirectory": "pods",
//   "blueprintsDirectory": "dummy/pods"
// }

export default function readConfig(callback) {
  fs.readFile('./.bluprintconfig', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now

    const options = Object.assign(
      {
        "rootDirectory": "app",
        "blueprintsDirectory": "blueprints"
      },
      JSON.parse(data)
    );

    callback(options);
  });
}