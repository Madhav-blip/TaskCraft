const jwt = require('jsonwebtoken');

// this middleware runs before the protected routes
// it checks the Authorization header for a valid token
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const parts = header.split(' ');

  // header should look like: Bearer eyJhbGci...
  if (parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    // put the user info on the request so controllers can use it
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    // token is expired or fake
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = requireAuth;
