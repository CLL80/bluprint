import fs from 'fs';
import path from 'path';
import ss from 'smart-stream';
import promptly from 'promptly';

import chalk from 'chalk';
import chip from 'chip';
import colors from 'colors';

import replaceTemplateVariables from './replace-template-variables';
import success from './success';

const log = chip();

export default function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__, callback, index = 0) {
  const blueprint = blueprints[index];

  if (blueprint) {
    // Prepare arguments for next recursion
    const nextArgs = [
      blueprints,
      __destinationDirectory__,
      __templateDirectory__,
      __templateName__,
      callback,
      index + 1
    ];

    // If a blueprint existes for the current index
    const fileName = __templateName__ ?
        __templateName__ + path.extname(blueprint) :
        path.basename(blueprint);
    const target = path.join(__destinationDirectory__, fileName);
    const __templateToken__ = __templateName__ ? path.parse(fileName).name : __templateDirectory__;

    // Build template variable middleware
    const handleTemplateVariables = buildTemplateVariablesMiddleware(
      new ss.SmartStream('ReplaceTemplateVariables'),
      __templateToken__
    );

    // Prepare arguments for writeFromBlueprint
    const writeArgs = [
      blueprint,
      target,
      handleTemplateVariables,
      () => copyFiles(...nextArgs)
    ];

    fs.stat(target, (err, stat) => {
      if (err == null) {
        // If a file at target already exists
        promptly.confirm('Overwrite ' + target + '?', (err, confirmed) => {
          if (confirmed) {
            // If user confirms overwrite
            writeFromBlueprint(...writeArgs);
          } else {
            // If user denies overwrite
            console.log('Skipping ' + target);
            copyFiles(...nextArgs);
          }
        });
      } else {
        // If no file at target exists
        writeFromBlueprint(...writeArgs);
      }
    });
  } else {
    // If no blueprint exists for the current index, the recursion ends
    callback();
  }
};

const buildTemplateVariablesMiddleware = (stream, __templateToken__) => {
  return stream.setMiddleware((data, callback) =>
    replaceTemplateVariables(data, __templateToken__, callback)
  );
}

const writeFromBlueprint = (blueprint, target, handleTemplateVariables, callback) => {
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
