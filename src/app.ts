import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import supremeAdminRoutes from './modules/supreme-admin/routes/supreme-admin.routes';
dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://dev-hq.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1', routes);
app.use(errorMiddleware);
app.use('/api/v1/supreme-admin', supremeAdminRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to DevHQ API 🚀',
  });
});

export default app;
