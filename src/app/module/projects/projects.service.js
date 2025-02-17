// title: '',
// desc: '',
// bannerImage,
// main image,
// top images = [], // 3 image
// bottom images = [],
// category: '',
// study: '',
// platform: '',
// vibe: ['','',]

import { Projects } from './projects.model.js';

const createProject = async (data) => {
  try {
    if (!data) {
      throw new Error('Project data is required');
    }

    const project = new Projects(data);
    await project.save();
    return project;
  } catch (error) {
    throw new Error(error.message || 'Failed to create project');
  }
};

const getAllProjects = async () => {
  try {
    return await Projects.find({});
  } catch (error) {
    throw new Error(error.message || 'Failed to retrieve projects');
  }
};

const getProject = async (id) => {
  try {
    const project = await Projects.findById(id);
    if (!project) throw new Error('Project not found');
    return project;
  } catch (error) {
    throw new Error(error.message || 'Failed to retrieve project');
  }
};

const updateProject = async (id, data) => {
  try {
    const updatedProject = await Projects.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProject) throw new Error('Project not found');
    return updatedProject;
  } catch (error) {
    throw new Error(error.message || 'Failed to update project');
  }
};

const deleteProject = async (id) => {
  try {
    const deletedProject = await Projects.findByIdAndDelete(id);
    if (!deletedProject) throw new Error('Project not found');
    return deletedProject;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete project');
  }
};

export const ProjectsServices = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
