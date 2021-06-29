import { Router } from 'express';
import { showHomePage } from '../controllers/home.controller';

const coreRoutes = Router();

coreRoutes
  .route('/about')
  .get((req, res) => res.render('about', { title: 'What is this?' }));

coreRoutes.route('/').get(showHomePage);

/*
 * EXPORTS
 */
export { coreRoutes };

export const coreMountPoint = '';
