// validation rules from the SRS document (section 1B)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s]*$/;

// checks the register form before it reaches the controller
function validateRegister(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || name.trim().length < 2 || !NAME_REGEX.test(name.trim())) {
    return res.status(400).json({
      message: 'Full name is required, minimum 2 characters, alphabetic characters only',
    });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required' });
  }
  if (!password || !PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters with an uppercase letter, a lowercase letter, a digit, and a special character',
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !EMAIL_REGEX.test(email) || !password) {
    return res.status(400).json({ message: 'Invalid email or password credentials' });
  }
  next();
}

module.exports = { validateRegister, validateLogin };
