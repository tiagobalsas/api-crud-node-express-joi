const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('../controllers/productController');

const app = express();

app.use(bodyParser.json());

const products = '/products';

app.get(products, ProductController.findAll);
app.get(`${products}/:id`, ProductController.findById);
app.post(products, ProductController.createProduct);
app.put(`${products}/:id`, ProductController.updateProduct);
app.delete(`${products}/:id`, ProductController.excludeProduct);

module.exports = app;
