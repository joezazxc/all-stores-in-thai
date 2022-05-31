import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(session({
  secret: process.env.SECRCT_EKEY,
  resave: true,
  saveUninitialized: true,
}))


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
