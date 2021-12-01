const ProductModel = require('../models/productModel');
const { productSchema } = require('../schemas/productSchema');

const createProduct = async ({ name, brand }) => {
  const { error } = productSchema.validate({ name, brand });

  if (error) {
    return { status: '400', response: { message: error.details[0].message } };
  }

  const productAlreadyExists = await ProductModel.validateNameProduct(name);
  if (productAlreadyExists) {
    return {
      status: '400',
      response: { message: '❌ Product already exists!' },
    };
  }

  const result = await ProductModel.createProduct({ name, brand });

  return { status: '201', response: result };
};

const findAll = async () => {
  const result = await ProductModel.findAll();

  return { status: '200', response: result };
};

const findById = async (id) => {
  const result = await ProductModel.findById(id);

  return { status: '200', response: result };
};

const updateProduct = async ({ id, name, brand }) => {
  const { error } = productSchema.validate({ name, brand });

  if (error) {
    return { status: '400', response: { message: error.details[0].message } };
  }

  const result = await ProductModel.updateProduct({ id, name, brand });
  if (!result) {
    return { status: '400', response: { message: 'Product not found' } };
  }

  return { status: '200', response: result };
};

const excludeProduct = async (id) => {
  await ProductModel.excludeProduct(id);

  return {
    status: '200',
    response: { message: 'product deleted successfully' },
  };
};

module.exports = {
  createProduct,
  findAll,
  findById,
  updateProduct,
  excludeProduct,
};

// response é um referencia para desestruturar no controller
