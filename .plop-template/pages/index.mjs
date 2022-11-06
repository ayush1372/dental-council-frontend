import path from 'path';
import { fileURLToPath } from 'url';

import { getComponentPath, getFileDirectory } from '../../plopfile.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = __dirname;

// used to add actions for genertors
function actions(componentPath, data, source) {
  const action = [];
  const srcPath = path.join(
    componentPath,
    data.pageType === 'sub-page' ? `${data.subPageFor}/sub-pages` : '',
    '{{kebabCase componentName}}'
  );

  if (data.isScssConfirm) {
    action.push({
      type: 'add',
      path: path.join(
        srcPath,
        data.pageType === 'sub-page' ? `{{kebabCase componentName}}.js` : `index.js`
      ),
      templateFile: path.join(TEMPLATE_DIR, 'index.js.txt'),
      data: {
        isSubPage: data.pageType === 'sub-page',
      },
    });

    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.module.scss'),
      templateFile: path.join(TEMPLATE_DIR, 'pages.module.scss.txt'),
    });
  } else {
    action.push({
      type: 'add',
      path: path.join(srcPath, 'index.js'),
      templateFile: path.join(TEMPLATE_DIR, 'noCSSImportIndex.js.txt'),
      data: {
        isSubPage: data.pageType === 'sub-page',
      },
    });
  }

  if (data.isTestConfirm) {
    action.push({
      type: 'add',
      path: path.join(srcPath, '{{kebabCase componentName}}.test.js'),
      templateFile: path.join(
        TEMPLATE_DIR,
        data.pageType !== 'sub-page' ? 'pages.test.js.txt' : 'sub-pages.test.js.txt'
      ),
    });
  }

  if (data.pageType !== 'sub-page') {
    action.push({
      type: 'add',
      path: path.join(componentPath, 'index.js'),
      pattern: `/* PLOP_INJECT_PAGES_EXPORT */`,
      templateFile: path.join(TEMPLATE_DIR, 'pages.js.txt'),
      skipIfExists: true,
    });
    action.push({
      type: 'append',
      path: path.join(componentPath, 'index.js'),
      pattern: `/* PLOP_INJECT_PAGES_EXPORT */`,
      template: `export { {{pascalCase componentName}} } from './{{kebabCase componentName}}';`,
    });
    action.push({
      type: 'append',
      path: path.join(source, 'constants/navigation-meta.js'),
      pattern: `/* PLOP_INJECT_PAGES_NAVIGATION_EXPORT */`,
      template: ` {
    path: '{{kebabCase componentName}}',
    title: '{{pascalCase componentName}}',
    component: '{{kebabCase componentName}}',
  },`,
    });
  } else {
    action.push({
      type: 'append',
      path: path.join(componentPath, 'index.js'),
      pattern: `/* PLOP_INJECT_PAGES_EXPORT */`,
      template: `export { {{pascalCase componentName}} } from './${data.subPageFor}/sub-pages/{{kebabCase componentName}}/{{kebabCase componentName}}';`,
    });
    action.push({
      type: 'append',
      path: path.join(source, 'constants/navigation-meta.js'),
      pattern: `/* PLOP_INJECT_PAGES_NAVIGATION_EXPORT */`,
      template: ` {
    path: '{{kebabCase componentName}}',
    title: '{{pascalCase componentName}}',
    component: '{{kebabCase componentName}}',
  },`,
    });
  }

  return action;
}

const PagePlop = function (plop, source) {
  plop.setGenerator('pages', {
    prompts: [
      {
        type: 'list',
        name: 'pageType',
        message: 'Pick a file directory:',
        choices: ['root-page', 'sub-page'],
      },
      {
        type: 'list',
        name: 'subPageFor',
        message: 'Select page for which to create sub-page',
        choices() {
          const componentPath = getComponentPath(source, 'pages');
          return getFileDirectory(componentPath);
        },
        when(data) {
          return data.pageType === 'sub-page';
        },
      },
      {
        type: 'input',
        name: 'componentName',
        message(data) {
          return data.pageType === 'root-page' ? `Name of the page` : `Name of the sub-page`;
        },
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return value.pageType === 'root-page'
            ? 'Page name is required'
            : 'Sub-page name is required';
        },
      },
      {
        type: 'confirm',
        name: 'isScssConfirm',
        message: 'Are you sure want to create scss?',
      },
      {
        type: 'confirm',
        name: 'isTestConfirm',
        message: 'Are you sure want to create test.js?',
      },
    ],
    actions(data) {
      const componentPath = getComponentPath(source, 'pages');
      return actions(componentPath, data, source);
    },
  });
};

export default PagePlop;
