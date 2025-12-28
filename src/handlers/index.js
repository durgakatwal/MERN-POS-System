import { Router } from "express";
import customerHandler from "./Customer.js";
import customerGroupHandler from "./customerGroup.js";
import supplierGroupHandler from "./supplierGroup.js";
import supplierHandler from "./supplier.js";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the POS API" });
});

//customer
router.use("/customer", customerHandler);
router.use("/customerGroup", customerGroupHandler);

//supplier
router.use("/supplierGroup", supplierGroupHandler);
router.use("/supplier", supplierHandler);
export default router;
