import path from 'path';
import { fileURLToPath } from 'url';

import { getComponentPath, getFileDirectory } from '../../plopfile.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = __dirname;

// used to add actions for genertors
function actions(componentPath, data) {
  const action = [];
  const srcPath = path.join(componentPath, `${data.subPageFor}`);

  action.push({
    type: 'add',
    path: path.join(componentPath, 'index.js'),
    pattern: `/* PLOP_INJECT_HELPER_EXPORT */`,
    templateFile: path.join(TEMPLATE_DIR, 'helpers.js.txt'),
    skipIfExists: true,
  });

  action.push({
    type: 'append',
    path: path.join(componentPath, 'index.js'),
    pattern: `/* PLOP_INJECT_HELPER_EXPORT */`,
    template: `export { {{pascalCase componentName}} } from './{{kebabCase subPageFor}}/{{kebabCase componentName}}';`,
  });

  action.push({
    type: 'add',
    path: path.join(srcPath, '{{kebabCase componentName}}.js'),
    templateFile: path.join(TEMPLATE_DIR, 'index.js.txt'),
  });

  return action;
}

const HelpersPlop = function (plop, source) {
  plop.setGenerator('helpers', {
    prompts: [
      {
        type: 'list',
        name: 'subPageFor',
        message: 'Select where to create helper',
        choices() {
          const componentPath = getComponentPath(source, 'helpers');
          return getFileDirectory(componentPath);
        },
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Name of the helpers',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Helper name is required';
        },
      },
    ],
    actions(data) {
      const componentPath = getComponentPath(source, 'helpers');
      return actions(componentPath, data);
    },
  });
};

export default HelpersPlop;
