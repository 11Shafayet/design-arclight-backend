import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route.js';
import { ProjectsRoutes } from '../module/projects/projects.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/projects',
    route: ProjectsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
