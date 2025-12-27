import NotFoundError from "../errors/not-found-error.js";
import ValidationError from "../errors/validation-error.js";
import Customer from "../models/Customer.js";

//create customer
export const createCustomer = async (req, res, next) => {
  try {
    const exists = await Customer.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Customer already exists");
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

//get all customers
export const getAllCustomers = async (req, res, next) => {
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
    const customers = await Customer.find(query)
      .sort({ [sortby]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Customer.countDocuments(query);
    res.json({
      success: true,
      data: customers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
      },
    });
  } catch (err) {
    next(err);
  }
};

//get customer by id
export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!customer) throw new NotFoundError("Customer not found");
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
};

//update customer
export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
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
    if (!customer) throw new NotFoundError("Customer not found");
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
};

//delete customer
export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      { isDeleted: true },
      {
        new: true,
      }
    );
    if (!customer) throw new NotFoundError("Customer not found");
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    next(err);
  }
};
