import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ApiRouter from './routes/api/index.js';
import responformat from './configs/responformat.js';
import sessions from 'express-session'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: process.env.SECRCT_EKEY,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(responformat)

app.use('/api', ApiRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.error(err);
});

export default app;