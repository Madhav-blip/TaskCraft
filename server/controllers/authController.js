const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// makes a jwt token with the user id and email inside
function makeToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // hash the password, never store plain text passwords!!
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash: passwordHash,
      // dicebear gives a free avatar image based on the name
      avatarUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=' + encodeURIComponent(name.trim()),
    });

    res.status(201).json({ token: makeToken(user), user: user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    // same error for wrong email and wrong password so hackers cant guess emails
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password credentials' });
    }
    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return res.status(401).json({ message: 'Invalid email or password credentials' });
    }

    res.json({ token: makeToken(user), user: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
