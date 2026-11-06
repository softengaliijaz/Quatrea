import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: env.clientUrl.split(','), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
if (!env.isProd) app.use(morgan('dev'));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
