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
  checkPermission("wareHouse", "create"),
  wareHouseCreateValidation,
  validate,
  createWareHouse
);
router.get(
  "/",
  authMiddleware,
  checkPermission("wareHouse", "read"),
  getAllWareHouses
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("wareHouse", "read"),
  wareHouseByIdValidation,
  validate,
  getWareHouseById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("wareHouse", "update"),
  wareHouseByIdValidation,
  validate,
  updateWareHouse
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("wareHouse", "delete"),
  wareHouseByIdValidation,
  validate,
  deleteWareHouse
);

export default router;
