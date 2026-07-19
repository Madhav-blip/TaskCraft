// email regex is from the SRS document
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// password regex - found a similar one on stackoverflow and changed it a bit
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
export const NAME_REGEX = /^[A-Za-z][A-Za-z\s]*$/

export function validateSignUp(form) {
  const errors = {}

  if (!form.name || !form.name.trim()) {
    errors.name = 'Full name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Minimum 2 characters'
  } else if (!NAME_REGEX.test(form.name.trim())) {
    errors.name = 'Alphabetic characters only'
  }

  if (!form.email) {
    errors.email = 'Email address is required'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (!PASSWORD_REGEX.test(form.password)) {
    errors.password =
      'Minimum 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export function validateSignIn(form) {
  const errors = {}

  if (!form.email) {
    errors.email = 'Email address is required'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  }

  return errors
}
