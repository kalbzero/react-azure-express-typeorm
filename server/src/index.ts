/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import { categoriesRouter } from './routes/categories.router';
import { coursesRouter } from './routes/courses.router';
import { filesRouter } from './routes/files.router';
import { logsRouter } from './routes/logs.router';
import { homeRouter } from './routes/home.router';
import { fileCategoryRouter } from './routes/file-category.router';
import { fileCourseRouter } from './routes/file-course.router';

dotenv.config();
/**
 * TypeORM Init DB
 */
createConnection("default").catch( err => console.error(err)); // 'prod'

/**
 * App Variables
 */
if (!process.env.PORT) {
   process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/nlclassroom/categories", categoriesRouter);
app.use("/api/nlclassroom/courses", coursesRouter);
app.use("/api/nlclassroom/files", filesRouter);
app.use("/api/nlclassroom/logs", logsRouter);
app.use("/api/nlclassroom/home", homeRouter);
app.use("/api/nlclassroom/file-course", fileCourseRouter);
app.use("/api/nlclassroom/file-category", fileCategoryRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});