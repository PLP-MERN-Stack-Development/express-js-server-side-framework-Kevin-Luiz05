// middleware/auth.js
// Simple API-key auth: check header x-api-key or Authorization: ApiKey <key>
const apiKey = process.env.API_KEY || 'dev-api-key-123'; // default for local dev

module.exports = (req, res, next) => {
  const headerKey = req.headers['x-api-key'] || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  if (!headerKey || headerKey !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized - invalid or missing API key' });
  }
  next();
};
