import express from "express";
const router = express.Router();

import { trackStatus } from "../controllers/trackingController.js";

router.route("/").get(trackStatus);

export default router;
