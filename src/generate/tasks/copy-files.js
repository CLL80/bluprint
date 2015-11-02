import fs from 'fs';
import path from 'path';
import ss from 'smart-stream';

import replaceTemplateVariables from './replace-template-variables';
import success from './success';

export default function copyFiles(blueprints, __destinationDirectory__, __templateDirectory__, __templateName__) {
  blueprints.forEach(blueprint => {
    const fileName = __templateName__ ?
        __templateName__ + path.extname(blueprint) :
        path.basename(blueprint);
    const target = path.join(__destinationDirectory__, fileName);

    const rd = fs.createReadStream(blueprint, { encoding: 'utf8' });
    rd.on("error", err => error(err));

    const wr = fs.createWriteStream(target);
    wr.on("error", err => error(err));
    wr.on("close", () => done(target));

    const handleTemplateVariables = new ss.SmartStream('ReplaceTemplateVariables');
    const __templateToken__ = __templateName__ ? path.parse(fileName).name : __templateDirectory__;

    handleTemplateVariables.setMiddleware((data, callback) =>
      replaceTemplateVariables(data, __templateToken__, callback)
    );

    rd.pipe(handleTemplateVariables)
      .pipe(wr);
  });

  const error = err => log.error(err);
  const done = target => success(target);
};