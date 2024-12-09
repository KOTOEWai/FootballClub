const { check, validationResult } = require('express-validator');
const Product = require('../models/product');
const removefiles = require('../helper/file')
// Validation for creating/updating products
const validateProduct = [
  check('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 100 }).withMessage('Product name should not exceed 100 characters'),

  check('category')
    .notEmpty().withMessage('Product category is required')
    .isIn(['Jerseys', 'Shoes', 'Accessories', 'Balls', 'Others']).withMessage('Invalid category'),

  check('price')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  check('description')
    .notEmpty().withMessage('Product description is required')
    .isLength({ max: 500 }).withMessage('Description should not exceed 500 characters'),

  check('stockQuantity')
    .isInt({ gt: 0 }).withMessage('Stock quantity must be a positive integer'),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Controller Methods

// Get all products
exports.getAllProducts = async (req, res) => {
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3 ;
  const startIndex = (page - 1) * limit;

  const totalItems = await Product.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);
  

  try {
    const products = await Product.find().skip(startIndex).limit(limit).exec();
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
      limit:limit,
      data:products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create product
exports.createProduct = [
  ...validateProduct, // Apply validation
  handleValidationErrors, // Check for validation errors
  async (req, res) => {

    const img = req.files?.img?.map((file)=>file.filename) || [];
    const { name, category, price, description, stockQuantity } = req.body;
    try {
      const product = new Product({ name, category, price, description, stockQuantity, img });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Error creating product", error });
    }
  }
];

// Update product
exports.updateProduct = [
  ...validateProduct, // Apply validation
  handleValidationErrors, // Check for validation errors
  async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: "Error updating product", error });
    }
  }
];

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
   
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
