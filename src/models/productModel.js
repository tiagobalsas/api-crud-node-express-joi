const { ObjectId } = require('mongodb');
const connection = require('./connection');

const validateNameProduct = async (name) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne({ name }));

  return product !== null;
};

const findAll = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }));

  return { product: result };
};

const createProduct = async ({ name, brand }) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, brand }));

  const result = await findById(product.insertedId);
  return result;
};

const updateProduct = async ({ id, name, brand }) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, brand } }));

  const result = await findById(id);

  return result;
};

const excludeProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  validateNameProduct,
  findAll,
  findById,
  createProduct,
  updateProduct,
  excludeProduct,
};
