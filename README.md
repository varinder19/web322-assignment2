# WEB322 Assignment 2 (with A1 service module included)

This project is ready to run for **Assignment 2** even if you did not complete Assignment 1.  
It includes the `modules/projects.js` service and all required EJS views, routes, Tailwind/DaisyUI setup, and a 404 page.

## IMPORTANT — Add Data Files (from Assignment 1)
Download the two JSON files provided by your professor and place them into the `data/` folder:

- `data/projectData.json`
- `data/sectorData.json`

Without these files, the server cannot render real projects.

## Install & Run
```bash
npm install
npm run tw:build   # in a separate terminal, to compile Tailwind -> public/css/main.css
npm start         # http://localhost:8080
```

## Deploy (Vercel)
- Push to GitHub
- Import to Vercel
- After deploy, update the "Published URL" in the server header comment.
