/******************************************************************************** 
*  WEB322 – Assignment 02
*  
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name: Varinder Kaur   Student ID: 122452238   Date: Nov 6, 2025
*  Published URL: https://web322-assignment2-beta.vercel.app/
* 
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// Home (landing)
app.get("/", (req, res) => res.render("home"));

// About
app.get("/about", (req, res) => res.render("about"));

// Projects list (optionally filter by ?sector=)
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  if (sector) {
    projectData
      .getProjectsBySector(sector)
      .then((projects) => res.render("projects", { projects }))
      .catch((err) => res.status(404).render("404", { message: err }));
  } else {
    projectData
      .getAllProjects()
      .then((projects) => res.render("projects", { projects }))
      .catch((err) => res.status(404).render("404", { message: err }));
  }
});

// Single project by :id
app.get("/solutions/projects/:id", (req, res) => {
  projectData
    .getProjectById(req.params.id)
    .then((project) => res.render("project", { project }))
    .catch((err) => res.status(404).render("404", { message: err }));
});

// 404 fallback
app.use((req, res) =>
  res
    .status(404)
    .render("404", { message: "I'm sorry, we're unable to find what you're looking for." })
);

let initialized = false;

projectData
  .initialize()
  .then(() => {
    initialized = true;
    console.log("Project data initialized successfully.");
  })
  .catch((err) => console.error(`Initialization error: ${err}`));

// Export the app instead of using app.listen()
module.exports = app;
