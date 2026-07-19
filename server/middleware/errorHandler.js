// catches errors from all the routes so the server doesnt crash
// and the user gets a proper message instead of a stack trace
function errorHandler(err, req, res, next) {
  console.error(err);

  // 11000 is the mongodb duplicate key error code
  if (err.code === 11000) {
    return res.status(409).json({ message: 'An account with this email already exists' });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid request data' });
  }
  res.status(500).json({ message: 'Something went wrong, please try again' });
}

module.exports = errorHandler;
