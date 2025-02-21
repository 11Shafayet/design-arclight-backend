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

    // Upload images to Cloudinary and get public_ids
    if (data.bannerImage) {
      const uploadResult = await cloudinary.v2.uploader.upload(
        data.bannerImage
      );
      data.bannerImage = uploadResult.public_id; // Store public_id
    }
    if (data.showImage) {
      const uploadResult = await cloudinary.v2.uploader.upload(data.showImage);
      data.showImage = uploadResult.public_id; // Store public_id
    }
    if (data.mainImage) {
      const uploadResult = await cloudinary.v2.uploader.upload(data.mainImage);
      data.mainImage = uploadResult.public_id; // Store public_id
    }
    if (data.topImages && data.topImages.length > 0) {
      const uploadResults = await Promise.all(
        data.topImages.map((image) => cloudinary.v2.uploader.upload(image))
      );
      data.topImages = uploadResults.map((result) => result.public_id); // Store public_ids
    }
    if (data.bottomImages && data.bottomImages.length > 0) {
      const uploadResults = await Promise.all(
        data.bottomImages.map((image) => cloudinary.v2.uploader.upload(image))
      );
      data.bottomImages = uploadResults.map((result) => result.public_id); // Store public_ids
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

    // Handle image updates only if new data is provided
    if (data.bannerImage && data.bannerImage !== project.bannerImage) {
      await cloudinary.v2.uploader.destroy(project.bannerImage);
      const uploadResult = await cloudinary.v2.uploader.upload(
        data.bannerImage
      );
      data.bannerImage = uploadResult.public_id; // Update to new public_id
    }

    if (data.showImage && data.showImage !== project.showImage) {
      await cloudinary.v2.uploader.destroy(project.showImage);
      const uploadResult = await cloudinary.v2.uploader.upload(data.showImage);
      data.showImage = uploadResult.public_id; // Update to new public_id
    }

    if (data.mainImage && data.mainImage !== project.mainImage) {
      await cloudinary.v2.uploader.destroy(project.mainImage);
      const uploadResult = await cloudinary.v2.uploader.upload(data.mainImage);
      data.mainImage = uploadResult.public_id; // Update to new public_id
    }

    if (data.topImages && data.topImages.length > 0) {
      await Promise.all(
        project.topImages.map((image) => cloudinary.v2.uploader.destroy(image))
      );
      const uploadResults = await Promise.all(
        data.topImages.map((image) => cloudinary.v2.uploader.upload(image))
      );
      data.topImages = uploadResults.map((result) => result.public_id); // Update to new public_ids
    }

    if (data.bottomImages && data.bottomImages.length > 0) {
      await Promise.all(
        project.bottomImages.map((image) =>
          cloudinary.v2.uploader.destroy(image)
        )
      );
      const uploadResults = await Promise.all(
        data.bottomImages.map((image) => cloudinary.v2.uploader.upload(image))
      );
      data.bottomImages = uploadResults.map((result) => result.public_id); // Update to new public_ids
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

    const publicIds = [
      project.bannerImage,
      project.showImage,
      project.mainImage,
      ...project.topImages,
      ...project.bottomImages,
    ].map((imagePath) => {
      // Extract public_id from the image path
      const parts = imagePath.split('/');
      return parts[parts.length - 1].split('.')[0]; // Get the last part and remove the extension
    });

    await Promise.all(
      publicIds.map((publicId) => cloudinary.v2.uploader.destroy(publicId))
    );

    const deletedProject = await Projects.findByIdAndDelete(id);
    return deletedProject;
  } catch (cloudinaryError) {
    console.error(
      'Error deleting images from Cloudinary:',
      cloudinaryError // Log the entire error object
    );
    throw new Error('Failed to delete images from Cloudinary');
  }
};

export const ProjectsServices = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
