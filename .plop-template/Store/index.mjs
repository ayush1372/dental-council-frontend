import path from 'path';
import { fileURLToPath } from 'url';

import { getComponentPath, getFileDirectory } from '../../plopfile.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = __dirname;

// used to add actions for genertors
function actions(componentPath, data) {
  const action = [];
  const srcPath = path.join(componentPath, data.pageType);

  action.push({
    type: 'add',
    path: path.join(componentPath, 'store.js'),
    skipIfExists: true,
  });

  if (data.pageType === 'reducers') {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase actionName}}.js'),
      templateFile: path.join(TEMPLATE_DIR, 'reducers.js.txt'),
    });
  }

  if (data.pageType === 'actions') {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase actionName}}.js'),
      templateFile: path.join(TEMPLATE_DIR, 'actions.js.txt'),
    });
  }

  return action;
}

const StorePlop = function (plop, source) {
  plop.setGenerator('store', {
    prompts: [
      {
        type: 'list',
        name: 'pageType',
        message: 'Select action or reducer',
        choices: [
          { name: 'Actions', value: 'actions' },
          { name: 'Reducers', value: 'reducers' },
        ],
      },
      {
        type: 'input',
        name: 'actionName',
        message(data) {
          return data.pageType === 'actions' ? 'Name of the Action' : 'Name of the Reducer';
        },
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return data.pageType === 'actions'
            ? 'Action name is required'
            : 'Reducer name is required';
        },
      },
    ],
    actions(data) {
      const componentPath = getComponentPath(source, 'store');
      return actions(componentPath, data);
    },
  });
};

export default StorePlop;
