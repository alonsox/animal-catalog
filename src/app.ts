import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { usersRoutes } from './modules/users/routes';

const app = express();

/*
 * APP CONFIG
 */
app.set('views', path.join(__dirname, 'templates'));
console.log(path.join(__dirname, 'templates'));

app.set('view engine', 'ejs');

/*
 * MIDDLEWARE
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * ROUTES
 */
app.get('/', (_, res) => res.render('home', { title: 'Animal Catalog' }));
app.use('/users', usersRoutes);

export { app };
