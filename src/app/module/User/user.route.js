import express from 'express';
import { UserControllers } from './user.controller.js';

const router = express.Router();

router.post('/login', UserControllers.loginUser);

export const UserRoutes = router;
