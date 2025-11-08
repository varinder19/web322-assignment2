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

app.use(express.static("public"));
app.set("view engine", "ejs");

// Initialize project data first
projectData
  .initialize()
  .then(() => {
    // Home Page
    app.get("/", (req, res) => res.render("home"));

    // About Page
    app.get("/about", (req, res) => res.render("about"));

    // Projects list (optional ?sector filter)
    app.get("/solutions/projects", async (req, res) => {
      try {
        const sector = req.query.sector;
        const projects = sector
          ? await projectData.getProjectsBySector(sector)
          : await projectData.getAllProjects();
        res.render("projects", { projects, currentSector: sector || "All" });
      } catch (err) {
        res.status(404).render("404", { message: err });
      }
    });

    // Single Project page
    app.get("/solutions/projects/:id", async (req, res) => {
      try {
        const project = await projectData.getProjectById(req.params.id);
        res.render("project", { project });
      } catch (err) {
        res.status(404).render("404", { message: err });
      }
    });

    // 404 fallback
    app.use((req, res) => {
      res
        .status(404)
        .render("404", { message: "I'm sorry, we can't find what you need." });
    });

    app.listen(HTTP_PORT, () =>
      console.log(`Server listening on http://localhost:${HTTP_PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
