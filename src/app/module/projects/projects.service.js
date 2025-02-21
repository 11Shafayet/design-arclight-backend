// title: '',
// desc: '',
// bannerImage,
//showImage,
// main image,
// top images = [], // 3 image
// bottom images = [],
// category: '',
// study: '',
// platform: '',
// vibe: ['','',]

import { Projects } from './projects.model.js';
import cloudinary from 'cloudinary';

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
    const project = await Projects.findById(id);
    if (!project) throw new Error('Project not found');

    // Handle image updates
    if (data.bannerImage && data.bannerImage !== project.bannerImage) {
      await cloudinary.v2.uploader.destroy(project.bannerImage);
    }
    if (data.showImage && data.showImage !== project.showImage) {
      await cloudinary.v2.uploader.destroy(project.showImage);
    }
    if (data.mainImage && data.mainImage !== project.mainImage) {
      await cloudinary.v2.uploader.destroy(project.mainImage);
    }
    if (data.topImages && data.topImages.length > 0) {
      await Promise.all(
        project.topImages.map((image) => cloudinary.v2.uploader.destroy(image))
      );
    }
    if (data.bottomImages && data.bottomImages.length > 0) {
      await Promise.all(
        project.bottomImages.map((image) =>
          cloudinary.v2.uploader.destroy(image)
        )
      );
    }

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
    const project = await Projects.findById(id);
    if (!project) throw new Error('Project not found');

    await Promise.all([
      cloudinary.v2.uploader.destroy(project.bannerImage),
      cloudinary.v2.uploader.destroy(project.showImage),
      cloudinary.v2.uploader.destroy(project.mainImage),
      ...project.topImages.map((image) =>
        cloudinary.v2.uploader.destroy(image)
      ),
      ...project.bottomImages.map((image) =>
        cloudinary.v2.uploader.destroy(image)
      ),
    ]);

    const deletedProject = await Projects.findByIdAndDelete(id);
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
