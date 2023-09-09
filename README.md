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
      npm install -D tailwindcss

 ```     

2. Then run command for tailwind configuration

```
     npx tailwindcss init        

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

4. Add the Tailwind directives to your CSS

```
        @tailwind base;
       @tailwind components;
       @tailwind utilities;
       
```

5. Run the CLI tool to scan your template files for        classes and build your CSS.

```
      npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

```

## Adding plugins and dependencies

```
           npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

```