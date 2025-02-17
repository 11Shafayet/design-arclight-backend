import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse.js';

// name: '',
// password: '',

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      throw new Error('Email and password are required');
    }

    if (name === 'Farzana' && password === 'Farzana111@') {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login Successful!',
        data: result,
      });
    }
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Login failed',
      data: null,
    });
  }
};

export const UserControllers = {
  loginUser,
};
