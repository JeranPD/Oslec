import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


// Connect Database
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/authRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import trackingRouter from "./routes/trackingRoutes.js";
import supplierRouter from "./routes/supplierRoutes.js";
// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './oslec-electronics/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customer", authenticateUser, customerRouter);
app.use("/api/v1/supplier", authenticateUser, supplierRouter);
app.use("/api/v1/tracking", trackingRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './oslec-electronics/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running from port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
