/******************************************************************************** 
*  WEB322 – Assignment 02
*  
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name: Varinder Kaur   Student ID: 122452238   Date: Nov 7, 2025
*  Published URL: https://web322-assignment2-beta.vercel.app/
* 
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as view engine and serve static assets
app.use(express.static("public"));
app.set("view engine", "ejs");

// ------------------ ROUTES ------------------ //

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// About Page
app.get("/about", (req, res) => {
  res.render("about");
});

// Projects List Page (with optional ?sector= filter)
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  // Map sector names to their corresponding IDs
  const sectorMap = {
    Buildings: 1,
    Industry: 2,
    Transportation: 3,
    Electricity: 4,
    Food: 5
  };

  projectData
    .getAllProjects()
    .then((projects) => {
      let filteredProjects = projects;

      if (sector && sectorMap[sector]) {
        filteredProjects = projects.filter(p => p.sector_id === sectorMap[sector]);
      }

      res.render("projects", { projects: filteredProjects });
    })
    .catch((err) => {
      res.status(404).render("404", { message: err });
    });
});

// Single Project by ID
app.get("/solutions/projects/:id", (req, res) => {
  projectData
    .getProjectById(req.params.id)
    .then((project) => res.render("project", { project }))
    .catch((err) => res.status(404).render("404", { message: err }));
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for." });
});

// ------------------ SERVER START ------------------ //

projectData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server running on http://localhost:${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to start: ${err}`);
    app.listen(HTTP_PORT, () => {
      console.log(`Server started with warnings on http://localhost:${HTTP_PORT}`);
    });
  });
