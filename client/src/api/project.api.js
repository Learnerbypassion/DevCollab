
import API from "./axios"; // your axios instance

// CREATE PROJECT
export const createProject = (data) =>
  API.post("/project/create-project", data);

// GET ALL PROJECTS
export const getAllProjects = () =>
  API.get("/project");

// GET SINGLE PROJECT
export const getProjectById = (id) =>
  API.get(`/project/${id}`);

// UPDATE PROJECT
export const updateProject = (id, data) =>
  API.patch(`/project/${id}`, data);

// DELETE PROJECT
export const deleteProject = (id) =>
  API.delete(`/project/${id}`);

// SEARCH PROJECT
export const searchProjects = (query) =>
  API.get(`/project/search?q=${query}`);