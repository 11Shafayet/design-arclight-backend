import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse.js';
import { ProjectsServices } from './projects.service.js';

const createProject = async (req, res) => {
  try {
    const { title, desc, category, study, platform, vibe } = req.body;

    const projectData = {
      title,
      desc,
      category,
      study,
      platform,
      vibe: vibe ? vibe.split(',') : [],
    };

    const result = await ProjectsServices.createProject(projectData, req.files);

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
    const result = await ProjectsServices.updateProject(
      id,
      req.body,
      req.files
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project updated successfully!',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to update project',
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
