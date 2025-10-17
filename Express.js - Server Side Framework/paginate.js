// utils/paginate.js
module.exports = function paginate(array, page = 1, limit = 5) {
  const total = array.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const p = Math.max(1, page);
  const offset = (p - 1) * limit;
  const data = array.slice(offset, offset + limit);
  return { page: p, limit, total, totalPages, data };
};
