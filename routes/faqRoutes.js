import express from "express";
import { createFaq, getFaqs } from "../controllers/faqController.js";
import { checkCache } from "../middlewares/checkCache.js";
 
const router = express.Router();

router.get("/", checkCache, getFaqs);
router.post("/create", createFaq);

export default router;