import NotFoundError from "../errors/not-found-error.js";
import ValidationError from "../errors/validation-error.js";
import Supplier from "../models/supplier.js";

//create supplier
export const createSupplier = async (req, res, next) => {
  try {
    const exists = await Supplier.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Supplier already exists");
    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

//get all suppliers
export const getAllSuppliers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortby = "createdAt",
      order = "desc",
      search = "",
    } = req.query;
    const query = {
      isDeleted: false,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    };
    const suppliers = await Supplier.find(query)
      .sort({ [sortby]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Supplier.countDocuments(query);
    res.json({
      success: true,
      data: suppliers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
      },
    });
  } catch (error) {
    next(error);
  }
};

//get supplier by Id
export const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!supplier) throw new NotFoundError("Supplier not found");
    res.json({ success: true, data: supplier });
  } catch (error) {
    next(error);
  }
};

//update supplier by id
export const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!supplier) throw new NotFoundError("Supplier not found");
    res.json({ success: true, data: supplier });
  } catch (error) {
    next(error);
  }
};

//delete supplier
export const deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    if (!supplier) throw new NotFoundError("Supplier not found");
    res.json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    next(error);
  }
};
