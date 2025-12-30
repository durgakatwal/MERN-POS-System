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
import express from "express";

const router = express.Router();

router.post("/", wareHouseCreateValidation, validate, createWareHouse);
router.get("/", getAllWareHouses);
router.get("/:id", wareHouseByIdValidation, validate, getWareHouseById);
router.put("/:id", wareHouseByIdValidation, validate, updateWareHouse);
router.delete("/:id", wareHouseByIdValidation, validate, deleteWareHouse);

export default router;
