// modules/projects.js
const path = require("path");

let projectData, sectorData;
try {
  projectData = require("../data/projectData");
  sectorData = require("../data/sectorData");
} catch (e) {
  // If files are missing, keep undefined; initialize() will reject with a clear message.
}

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      if (!projectData || !sectorData) {
        return reject(
          "Data files missing. Please add data/projectData.json and data/sectorData.json."
        );
      }
      projects = projectData.map((p) => {
        const sector = sectorData.find((s) => s.id === p.sector_id);
        return { ...p, sector: sector ? sector.sector_name : "Unknown" };
      });
      resolve();
    } catch (err) {
      reject("Failed to initialize project data");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    projects.length > 0 ? resolve(projects) : reject("No projects available");
  });
}

function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const project = projects.find((p) => p.id == id);
    project ? resolve(project) : reject("Unable to find requested project");
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    if (!sector) return reject("Sector is required");
    const list = projects.filter((p) =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    list.length > 0
      ? resolve(list)
      : reject(`No projects found for sector: ${sector}`);
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
