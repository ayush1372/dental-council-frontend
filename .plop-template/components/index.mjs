import path from 'path';
import { fileURLToPath } from 'url';

import { getComponentPath, getFileDirectory } from '../../plopfile.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = __dirname;

// used to add actions for genertors
function actions(componentPath, data) {
  const action = [];
  const srcPath = path.join(
    componentPath,
    data.componentFor === 'ui'
      ? `${data.subComponents}`
      : data.componentFor === 'pages'
      ? `${data.subComponents}/components`
      : '',
    '{{kebabCase componentName}}'
  );

  if (data.componentFor === 'ui') {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.js'),
      templateFile: path.join(
        TEMPLATE_DIR,
        `${data.isCssConfirm ? 'index.js.txt' : 'noCSSImportIndex.js.txt'}`
      ),
    });

    action.push({
      type: 'add',
      path: path.join(componentPath, `{{kebabCase subComponents}}/index.js`),
      templateFile: path.join(TEMPLATE_DIR, 'ui.js.txt'),
      skipIfExists: true,
    });
    action.push({
      type: 'append',
      path: path.join(componentPath, `{{kebabCase subComponents}}/index.js`),
      pattern: `/* PLOP_INJECT_UI_EXPORT */`,
      template: `export * from './{{kebabCase componentName}}/{{kebabCase componentName}}';`,
      skipIfExists: true,
    });
  }
  if (data.componentFor === 'shared') {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.js'),
      templateFile: path.join(
        TEMPLATE_DIR,
        `${data.isCssConfirm ? 'index.js.txt' : 'noCSSImportIndex.js.txt'}`
      ),
    });

    action.push({
      type: 'add',
      path: path.join(componentPath, `index.js`),
      templateFile: path.join(TEMPLATE_DIR, 'ui.js.txt'),
      skipIfExists: true,
    });
    action.push({
      type: 'append',
      path: path.join(componentPath, `index.js`),
      pattern: `/* PLOP_INJECT_UI_EXPORT */`,
      template: `export * from './{{kebabCase componentName}}/{{kebabCase componentName}}';`,
      skipIfExists: true,
    });
  }

  if (data.componentFor === 'pages') {
    action.push({
      type: 'add',
      path: path.join(srcPath, 'default.js'),
      templateFile: path.join(TEMPLATE_DIR, 'default.js.txt'),
    });

    // action.push({
    //   type: 'add',
    //   path: path.join(componentPath, `${data.subComponents}/components`, `index.js`),
    //   templateFile: path.join(TEMPLATE_DIR, 'index.js.txt'),
    //   skipIfExists: true,
    // });
    // action.push({
    //   type: 'append',
    //   path: path.join(componentPath, `${data.subComponents}/components`, `index.js`),
    //   pattern: `/* PLOP_INJECT_UI_EXPORT */`,
    //   template: `export { {{pascalCase componentName}} } from './{{kebabCase componentName}}';`,
    //   skipIfExists: true,
    // });
  }

  if (data.isCssConfirm) {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.module.scss'),
      templateFile: path.join(TEMPLATE_DIR, 'ui.module.scss.txt'),
    });
  }

  if (data.isTestConfirm) {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.test.js'),
      templateFile: path.join(
        TEMPLATE_DIR,
        `${data.componentFor === 'pages' ? 'default.test.js.txt' : 'ui.test.js.txt'}`
      ),
    });
  }

  if (data.isStoryBookConfirm) {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.stories.js'),
      templateFile: path.join(
        TEMPLATE_DIR,
        `${data.componentFor === 'pages' ? 'default.stories.js.txt' : 'ui.stories.js.txt'}`
      ),
    });
  }

  return action;
}

const ComponentPlop = function (plop, source) {
  plop.setGenerator('components', {
    prompts: [
      {
        type: 'list',
        name: 'componentFor',
        message: 'Select component type',
        choices: [
          { name: 'ui', value: 'ui' },
          { name: 'shared', value: 'shared' },
          { name: 'pages', value: 'pages' },
        ],
      },
      {
        type: 'list',
        name: 'subComponents',
        message: 'Select where to create the component',
        choices(data) {
          const componentPath = getComponentPath(source, data.componentFor);
          return getFileDirectory(componentPath);
        },
        when(data) {
          return data.componentFor !== 'shared';
        },
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Name of the components ?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Component name is required';
        },
      },
      {
        type: 'confirm',
        name: 'isCssConfirm',
        message: 'Are you sure want to create module.scss ?',
      },
      {
        type: 'confirm',
        name: 'isTestConfirm',
        message: 'Are you sure want to create test.js ?',
      },
      {
        type: 'confirm',
        name: 'isStoryBookConfirm',
        message: 'Are you sure want to create stories.js ?',
      },
    ],
    actions(data) {
      const componentPath = getComponentPath(source, data.componentFor);
      return actions(componentPath, data);
    },
  });
};

export default ComponentPlop;
