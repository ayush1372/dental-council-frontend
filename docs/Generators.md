# Benefits

Generator is a tool that gives a simple way to generate code or any file type. By using generator we will create structures and patterns in our code.

# How to Install Plop

npm install plop

# How to write Generators

Step 1: Create a plopfile.mjs at the root of our project.

Step 2: Create a .plop-template at the root of our project.
create sub-folder for each component eg: .plop-template/component, .plop-template/pages, .plop-templatehelpers etc.

Step 3: Create a index.mjs under .plop-template where we can add generators, then we can add prompts and actions in setGenerator function.

Step 4: Add template file for each pages, where we can place the placeholders for each variable appear in the template between {{ }}.

Step 5: Import all generators in plopfile.mjs file and configure all the generators which we have created.

# How to run Generators

Step 1: Add a ‘plop’ script in packages.json
{  
 ...,  
 "scripts": {  
 ...,
"generate": "plop"
},
...
}

Step 2: Open Command Prompt or Terminal and run
npm run generate -> While run this command it will show list of generator which have been created.
(OR)
npm run generate generator-name -> While running this command directly we can run with generator name so it will directly create the component in the corresponding path

for more details refer

1. https://www.npmjs.com/package/plop
2. https://github.com/plopjs/plop
3. https://blog.logrocket.com/automatically-generate-react-components-plop-js/
4. https://www.nicoespeon.com/en/2015/11/plop-micro-generator-boilerplate-yeoman-alternative/
5. https://medium.com/@fgmonaghan/boost-your-coding-productivity-with-plop-tutorial-68f2a50b15f3
