import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { authRoutes } from './modules/security/routes';
import { usersMountPoint, usersRoutes } from './modules/users/routes';
import { catalogMountPoint, catalogRoutes } from './modules/animals/routes';
import { NotFound } from './modules/shared/errors';
import { errorHandler } from './modules/core/error.handler';
import { coreMountPoint, coreRoutes } from './modules/core/routes';
import {
  setCurrentUser,
  setUpAuthentication,
} from './modules/security/middleware';

const app = express();

/*
 * APP CONFIG
 */
app.set('views', path.join(__dirname, 'templates'));
console.log(path.join(__dirname, 'templates'));

app.set('view engine', 'ejs'); // My middlwware

/*
 * MIDDLEWARE
 */
// My middleware
app.use(setUpAuthentication());
app.use(setCurrentUser());

// Other middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * ROUTES
 */
app.use(coreMountPoint, coreRoutes);
app.use('/auth', authRoutes);
app.use(usersMountPoint, usersRoutes);
app.use(catalogMountPoint, catalogRoutes);

/*
 * ERROR HANDLER
 */
app.use((req, res, next) => next(new NotFound('Not Found')));
app.use(errorHandler);

export { app };
