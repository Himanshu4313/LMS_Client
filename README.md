# Create react app using vite 

        This LMS project is build using React..

## Step for setup create vite-react-app

1. 

   ```
   npx create vite@latest

   ```

2. 

   ```
   npx degit user/project my-project
   cd my-project

   npm install
   npm run dev

   ```
 ### Setup tailwindcss instruction

 1. Download tailwind dependencie
 ```
      npm install -D tailwindcss postcss autoprefixer

 ```     

2. Then run command for tailwind configuration

```
    npx tailwindcss init -p     

```

3. Add the paths to all of your template files in your     tailwind.config.js file.

```
       /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./src/**/*.{html,js,jsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
}

```

4. Add the Tailwind directives to your CSS in index css

```
        @tailwind base;
       @tailwind components;
       @tailwind utilities;
       
```

5. Add this following properties in plugins of tailwind config

```
      plugins: [require('daisyui') , require('@tailwindcss/line-clamp')],

```

## Adding plugins and dependencies

```
           npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

```

### Configure auto import sort eslint

1. install simple import sort

```
   npm i -D eslint-plugin-simple-sort

```
2. Add rule in 'eslint.cjs'

```
   'simple-import-sort/imports': 'error'

```

3. Add eslint plugins 

```
   plugins : ['react-refresh' , 'simple-import-sort'],

```

4. To enable auto import sort on file save in  vscode
     
     -open 'setting.json'
```
            "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }

```

## LIVE LINK OF THIS APP 
(Live App)[https://learning-management-systems.netlify.app]
