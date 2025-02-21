import express from 'express';
import { ProjectsControllers } from './projects.controller.js';
import upload from '../../../config/upload.js';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'showImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'topImages', maxCount: 3 },
    { name: 'bottomImages', maxCount: 7 },
  ]),
  ProjectsControllers.createProject
);

router.get('/', ProjectsControllers.getAllProjects);
router.get('/:id', ProjectsControllers.getProject);

router.patch(
  '/:id',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'showImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'topImages', maxCount: 3 },
    { name: 'bottomImages', maxCount: 7 },
  ]),
  ProjectsControllers.updateProject
);

router.delete('/:id', ProjectsControllers.deleteProject);

export const ProjectsRoutes = router;
