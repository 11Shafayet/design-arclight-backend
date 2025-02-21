import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse.js';
import { ProjectsServices } from './projects.service.js';

const buildProjectData = (req) => ({
  title: req.body.title,
  desc: req.body.desc,
  bannerImage: req.files?.bannerImage ? req.files.bannerImage[0].path : null,
  showImage: req.files?.showImage ? req.files.showImage[0].path : null,
  mainImage: req.files?.mainImage ? req.files.mainImage[0].path : null,
  topImages: req.files?.topImages
    ? req.files.topImages.map((file) => file.path)
    : [],
  bottomImages: req.files?.bottomImages
    ? req.files.bottomImages.map((file) => file.path)
    : [],
  category: req.body.category,
  study: req.body.study,
  platform: req.body.platform,
  vibe: req.body.vibe ? req.body.vibe.split(',') : [],
});

const createProject = async (req, res) => {
  try {
    if (!req.body || !req.files) {
      throw new Error('Request body and files are required');
    }

    const projectData = buildProjectData(req);
    const result = await ProjectsServices.createProject(projectData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project created successfully!',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to create project',
      data: null,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const result = await ProjectsServices.getAllProjects();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Projects retrieved successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to retrieve projects',
      data: null,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProjectsServices.getProject(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project retrieved successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to retrieve project',
      data: null,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = buildProjectData(req);
    const result = await ProjectsServices.updateProject(id, updateData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project updated successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to update project',
      data: null,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProjectsServices.deleteProject(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project deleted successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to delete project',
      data: null,
    });
  }
};

export const ProjectsControllers = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
