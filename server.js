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
const path = require("path");
const projectData = require("./data/projectData.json");
const sectorData = require("./data/sectorData.json");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// ==============================
// Middleware
// ==============================

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==============================
// Routes
// ==============================

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// About page
app.get("/about", (req, res) => {
  res.render("about");
});

// List all projects (with optional sector filter)
app.get("/solutions/projects", (req, res) => {
  const { sector } = req.query;
  let projects = projectData;

  if (sector) {
    projects = projects.filter(
      (p) => p.sector && p.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  res.render("projects", { projects, sector });
});

// Single project details page
app.get("/solutions/projects/:id", (req, res) => {
  const project = projectData.find((p) => p.id == req.params.id);

  if (project) {
    res.render("project", { project });
  } else {
    res.status(404).render("404", { message: "Project not found" });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// ==============================
// Start Server
// ==============================
app.listen(HTTP_PORT, () =>
  console.log(`Server is running on port ${HTTP_PORT}`)
);
