import fs from 'fs';
import path from 'path';
import ss from 'smart-stream';
import promptly from 'promptly';

import replaceTemplateVariables from './replace-template-variables';
import success from './success';

export default function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index = 0) {
  const blueprint = blueprints[index];

  if (blueprint) {
    // If a blueprint existes for the current index
    const fileName = __templateName__ ?
        __templateName__ + path.extname(blueprint) :
        path.basename(blueprint);
    const target = path.join(__destinationDirectory__, fileName);

    const handleTemplateVariables = new ss.SmartStream('ReplaceTemplateVariables');
    const __templateToken__ = __templateName__ ? path.parse(fileName).name : __templateDirectory__;

    handleTemplateVariables.setMiddleware((data, middlewareCallback) =>
      replaceTemplateVariables(data, __templateToken__, middlewareCallback)
    );

    fs.stat(target, (err, stat) => {
      if (err == null) {
        // If a file at target already exists
        promptly.confirm('Overwrite ' + target + '?', (err, confirmed) => {
          if (confirmed) {
            // If user confirms overwrite
            writeFromBlueprint(blueprint, target, handleTemplateVariables, () =>
              copyFiles(
                blueprints,
                __destinationDirectory__,
                __templateDirectory__,
                __templateName__,
                callback,
                index + 1
              )
            );
          } else {
            // If user denies overwrite
            console.log('Skipping ' + target);

            copyFiles(
              blueprints,
              __destinationDirectory__,
              __templateDirectory__,
              __templateName__,
              callback,
              index + 1
            );
          }
        });
      } else {
        // If no file at target exists
        writeFromBlueprint(blueprint, target, handleTemplateVariables, () =>
          copyFiles(
            blueprints,
            __destinationDirectory__,
            __templateDirectory__,
            __templateName__,
            callback,
            index + 1
          )
        );
      }
    });
  } else {
    // If no blueprint exists for the current index
    callback();
  }
};

function writeFromBlueprint(blueprint, target, handleTemplateVariables, callback) {
  const rd = fs.createReadStream(blueprint, { encoding: 'utf8' });
  rd.on("error", err => error(err));

  const wr = fs.createWriteStream(target);
  wr.on("error", err => error(err));
  wr.on("close", () => {
    done(target);
    callback()
  });

  rd.pipe(handleTemplateVariables)
    .pipe(wr);
}

const error = err => log.error(err);
const done = target => success(target);