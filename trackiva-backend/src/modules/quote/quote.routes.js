import express from "express";
import { getQuote } from "./quote.controller.js";

const router = express.Router();

router.get("/", getQuote);

export default router;