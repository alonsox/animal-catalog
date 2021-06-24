import { Router } from 'express';
import { validateLogin } from '../validators';
import { loginUser, logout, showLoginForm } from '../controllers';

const authRoutes = Router();

authRoutes.route('/log-in').get(showLoginForm).post(validateLogin(), loginUser);

authRoutes.route('/log-out').get(logout);

export { authRoutes };
