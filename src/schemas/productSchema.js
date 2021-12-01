const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().empty().required(),
  brand: Joi.string().empty().required(),
});

module.exports = { productSchema };
