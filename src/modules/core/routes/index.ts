import { Router } from 'express';
import { showHomePage } from '../controllers/home.controller';

const coreRoutes = Router();

coreRoutes.route('/').get(showHomePage);

/*
 * EXPORTS
 */
export { coreRoutes };

export const coreMountPoint = '';
