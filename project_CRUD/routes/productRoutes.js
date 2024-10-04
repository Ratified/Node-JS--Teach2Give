const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const { getAllProducts, getProduct, addProduct, editProduct, deleteProduct } = productController;

// Route to get all products
router.get('/', getAllProducts);

//Route to get a single product
router.get('/:id', getProduct);

// Route to add a new product
router.post('/', addProduct);

// Route to edit a product
router.put('/:id', editProduct);

// Route to delete a product
router.delete('/:id', deleteProduct);

module.exports = router;