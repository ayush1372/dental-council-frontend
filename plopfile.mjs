import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import PagePlop from './.plop-template/pages/index.mjs';
import StorePlop from './.plop-template/store/index.mjs';
import HelpersPlop from './.plop-template/helpers/index.mjs';
import ComponentPlop from './.plop-template/components/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, 'src');

// used to get component path
export function getComponentPath(source, aType) {
  return path.join(source, aType.split('-')[0]);
}

// used to read the contents of a directory.
export function getFileDirectory(filepath) {
  return new Promise((res, rej) => {
    fs.readdir(filepath, (err, files) =>
      err ? rej(err) : res(files.filter((p) => !/[!^.]/.test(p)))
    );
  });
}

// used to call generators
export default function (plop) {
  PagePlop(plop, source);
  StorePlop(plop, source);
  HelpersPlop(plop, source);
  ComponentPlop(plop, source);
}
