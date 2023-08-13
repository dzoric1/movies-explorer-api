import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errors } from 'celebrate';

import router from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
// import auth from './middlewares/auth.js';
import errorMiddleware from './middlewares/errors.js';
import { corsOptions, limiterSettings } from './utils/variables.js';
import { PORT, DB_URL } from './utils/config.js';

const app = express();

mongoose.connect(DB_URL);

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit(limiterSettings));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
