import { Router } from "express";
import customerHandler from "./Customer.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the POS API" });
});

router.use("/customer", customerHandler);
export default router;
