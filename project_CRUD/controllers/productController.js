const { readData, writeData } = require('../models/productModel');

// Get all products
const getAllProducts = (req, res) => {
  const data = readData();
  res.json(data);
};

//Get a single product
const getProduct = (req, res) => {
    const { id } = req.params;
    const data = readData();
    const product = data.find((item) => item.id === Number(id));
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
}

// Add a new product
const addProduct = (req, res) => {
  const data = readData();
  const newProduct = req.body;
  newProduct.id = Date.now();
  data.push(newProduct);
  writeData(data);
  res.json(newProduct);
};

// Edit a product
const editProduct = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const productIndex = data.findIndex((item) => item.id === Number(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  data[productIndex] = { ...data[productIndex], ...req.body };
  writeData(data);
  res.json(data[productIndex]);
};

// Delete a product
const deleteProduct = (req, res) => {
  const { id } = req.params;
  let data = readData();
  data = data.filter((item) => item.id !== Number(id));
  writeData(data);
  res.json({ message: 'Product deleted' });
};

module.exports = { getAllProducts, getProduct, addProduct, editProduct, deleteProduct };