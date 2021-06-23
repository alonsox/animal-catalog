import express from 'express';
import morgan from 'morgan';
import path from 'path';

/*
 * CREATE APP
 */
const app = express();

/*
 * APP CONFIG
 */
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.get('/', (_, res) => res.render('home'))

/*
 * MIDDLEWARE
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));


export { app };
