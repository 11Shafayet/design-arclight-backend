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
import cloudinary from '../../../config/cloudinary.js'; // Ensure correct path to Cloudinary config

const uploadToCloudinary = async (fileBuffer, folder = 'projects') => {
  if (!fileBuffer) return null; // Skip upload if no file

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.public_id); // Return only public_id
      }
    );

    uploadStream.end(fileBuffer); // Upload file buffer
  });
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return; // Skip if no public ID

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Failed to delete image: ${publicId}`, error);
  }
};

const createProject = async (data, files) => {
  try {
    if (!data) throw new Error('Project data is required');

    // Upload images if available
    if (files.bannerImage) {
      data.bannerImage = await uploadToCloudinary(files.bannerImage[0].buffer);
    }
    if (files.showImage) {
      data.showImage = await uploadToCloudinary(files.showImage[0].buffer);
    }
    if (files.mainImage) {
      data.mainImage = await uploadToCloudinary(files.mainImage[0].buffer);
    }
    if (files.topImages) {
      data.topImages = await Promise.all(
        files.topImages.map((file) => uploadToCloudinary(file.buffer))
      );
    }
    if (files.bottomImages) {
      data.bottomImages = await Promise.all(
        files.bottomImages.map((file) => uploadToCloudinary(file.buffer))
      );
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

const updateProject = async (id, data, files) => {
  try {
    const project = await Projects.findById(id);
    if (!project) throw new Error('Project not found');

    // Handle image updates
    if (files.bannerImage) {
      await deleteFromCloudinary(project.bannerImage);
      data.bannerImage = await uploadToCloudinary(files.bannerImage[0].buffer);
    }

    if (files.showImage) {
      await deleteFromCloudinary(project.showImage);
      data.showImage = await uploadToCloudinary(files.showImage[0].buffer);
    }

    if (files.mainImage) {
      await deleteFromCloudinary(project.mainImage);
      data.mainImage = await uploadToCloudinary(files.mainImage[0].buffer);
    }

    if (files.topImages) {
      await Promise.all(project.topImages.map(deleteFromCloudinary));
      data.topImages = await Promise.all(
        files.topImages.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    if (files.bottomImages) {
      await Promise.all(project.bottomImages.map(deleteFromCloudinary));
      data.bottomImages = await Promise.all(
        files.bottomImages.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    const updatedProject = await Projects.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProject;
  } catch (error) {
    throw new Error(error.message || 'Failed to update project');
  }
};

const deleteProject = async (id) => {
  try {
    const project = await Projects.findById(id);
    if (!project) throw new Error('Project not found');

    // Delete all images from Cloudinary
    await Promise.all([
      deleteFromCloudinary(project.bannerImage),
      deleteFromCloudinary(project.showImage),
      deleteFromCloudinary(project.mainImage),
      ...project.topImages.map(deleteFromCloudinary),
      ...project.bottomImages.map(deleteFromCloudinary),
    ]);

    return await Projects.findByIdAndDelete(id);
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
