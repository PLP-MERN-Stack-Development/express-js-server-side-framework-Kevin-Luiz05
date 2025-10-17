// middleware/validateProduct.js
const { BadRequestError } = require('../errors/customErrors');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (typeof name !== 'string' || name.trim() === '') return next(new BadRequestError('name is required and must be a non-empty string'));
  if (typeof description !== 'string') return next(new BadRequestError('description is required and must be a string'));
  if (typeof price !== 'number' && typeof price !== 'string') return next(new BadRequestError('price is required and must be a number'));
  if (isNaN(Number(price))) return next(new BadRequestError('price must be numeric'));
  if (typeof category !== 'string' || category.trim() === '') return next(new BadRequestError('category is required and must be a string'));
  // inStock optional but if present must be boolean-like
  if (inStock !== undefined && typeof inStock !== 'boolean' && typeof inStock !== 'string' && typeof inStock !== 'number') {
    return next(new BadRequestError('inStock must be boolean'));
  }
  next();
};
