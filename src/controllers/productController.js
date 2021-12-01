const ProductService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, brand } = req.body;
  try {
    const { status, response } = await ProductService.createProduct({
      name,
      brand,
    });

    return res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findAll = async (_req, res) => {
  try {
    const { status, response } = await ProductService.findAll();

    return res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const { status, response } = await ProductService.findById(id);
    return res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand } = req.body;

  try {
    const { status, response } = await ProductService.updateProduct({
      id,
      name,
      brand,
    });

    return res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const excludeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = await ProductService.excludeProduct(id);
    return res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  createProduct,
  findAll,
  findById,
  updateProduct,
  excludeProduct,
};
