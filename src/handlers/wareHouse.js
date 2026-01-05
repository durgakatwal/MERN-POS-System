import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createWareHouse,
  deleteWareHouse,
  getAllWareHouses,
  getWareHouseById,
  updateWareHouse,
} from "../services/wareHouse.js";
import {
  wareHouseByIdValidation,
  wareHouseCreateValidation,
} from "../validators/wareHouse.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";
import express from "express";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("WareHouse", "create"),
  wareHouseCreateValidation,
  validate,
  createWareHouse
);
router.get(
  "/",
  authMiddleware,
  checkPermission("WareHouse", "read"),
  getAllWareHouses
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("WareHouse", "read"),
  wareHouseByIdValidation,
  validate,
  getWareHouseById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("WareHouse", "update"),
  wareHouseByIdValidation,
  validate,
  updateWareHouse
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("WareHouse", "delete"),
  wareHouseByIdValidation,
  validate,
  deleteWareHouse
);

export default router;
