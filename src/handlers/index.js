import { Router } from "express";
import customerHandler from "./Customer.js";
import customerGroupHandler from "./customerGroup.js";
import supplierGroupHandler from "./supplierGroup.js";
import supplierHandler from "./supplier.js";
import productCategoryHandler from "./productCategory.js";
import wareHouseHandler from "./wareHouse.js";
import productHandler from "./product.js";
import productVariationHandler from "./productVariation.js";
import productVariationOptionHandler from "./productVariationOption.js";
import roleHandler from "./role.js";
import employeeHandler from "./employee.js";
import authHandler from "./auth.js";
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

//product
router.use("/productCategory", productCategoryHandler);
router.use("/wareHouse", wareHouseHandler);
router.use("/product", productHandler);
router.use("/productVariation", productVariationHandler);
router.use("/productVariationOption", productVariationOptionHandler);

//Employee-role,permission
router.use("/role", roleHandler);
router.use("/employee", employeeHandler);
router.use("/auth", authHandler);
export default router;
