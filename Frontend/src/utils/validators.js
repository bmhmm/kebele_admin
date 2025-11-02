import { VALIDATION_MESSAGES } from './constants';

/**
 * Required field validator
 * @param {string} value - Value to validate
 * @returns {string|null} Error message or null if valid
 */
export const required = (value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  return null;
};

/**
 * Email validator
 * @param {string} value - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const email = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return VALIDATION_MESSAGES.EMAIL;
  }
  return null;
};

/**
 * Phone number validator (Ethiopian format)
 * @param {string} value - Phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const phone = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const ethiopianPhoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
  const cleanedValue = value.replace(/\s+/g, '');
  
  if (!ethiopianPhoneRegex.test(cleanedValue)) {
    return VALIDATION_MESSAGES.PHONE;
  }
  return null;
};

/**
 * Minimum length validator
 * @param {number} min - Minimum length
 * @returns {Function} Validator function
 */
export const minLength = (min) => (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  if (value.length < min) {
    return VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', min);
  }
  return null;
};

/**
 * Maximum length validator
 * @param {number} max - Maximum length
 * @returns {Function} Validator function
 */
export const maxLength = (max) => (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  if (value.length > max) {
    return VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', max);
  }
  return null;
};

/**
 * Numeric validator
 * @param {string|number} value - Value to validate
 * @returns {string|null} Error message or null if valid
 */
export const numeric = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  if (isNaN(Number(value))) {
    return VALIDATION_MESSAGES.NUMERIC;
  }
  return null;
};

/**
 * Positive number validator
 * @param {string|number} value - Value to validate
 * @returns {string|null} Error message or null if valid
 */
export const positiveNumber = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return VALIDATION_MESSAGES.POSITIVE_NUMBER;
  }
  return null;
};

/**
 * Age validator (1-120 years)
 * @param {string|number} value - Age value
 * @returns {string|null} Error message or null if valid
 */
export const age = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const ageValue = Number(value);
  if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
    return 'Age must be between 1 and 120 years';
  }
  return null;
};

/**
 * Future date validator
 * @param {string|Date} value - Date to validate
 * @returns {string|null} Error message or null if valid
 */
export const futureDate = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const inputDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (inputDate <= today) {
    return VALIDATION_MESSAGES.FUTURE_DATE;
  }
  return null;
};

/**
 * Past date validator
 * @param {string|Date} value - Date to validate
 * @returns {string|null} Error message or null if valid
 */
export const pastDate = (value) => {
  if (!value) return null; // Skip if empty (use required separately)
  
  const inputDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (inputDate >= today) {
    return VALIDATION_MESSAGES.PAST_DATE;
  }
  return null;
};

/**
 * Date range validator
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {string|null} Error message or null if valid
 */
export const dateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start > end) {
    return 'End date must be after start date';
  }
  return null;
};

/**
 * File type validator
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {string|null} Error message or null if valid
 */
export const fileType = (file, allowedTypes) => {
  if (!file) return null;
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
  }
  return null;
};

/**
 * File size validator
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {string|null} Error message or null if valid
 */
export const fileSize = (file, maxSize) => {
  if (!file) return null;
  
  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / 1024 / 1024}MB`;
  }
  return null;
};

/**
 * Password strength validator
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const passwordStrength = (password) => {
  if (!password) return null;
  
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  const missingRequirements = Object.keys(requirements)
    .filter(key => !requirements[key])
    .map(key => {
      switch (key) {
        case 'minLength': return 'at least 8 characters';
        case 'hasUpperCase': return 'one uppercase letter';
        case 'hasLowerCase': return 'one lowercase letter';
        case 'hasNumber': return 'one number';
        case 'hasSpecialChar': return 'one special character';
        default: return key;
      }
    });
  
  if (missingRequirements.length > 0) {
    return `Password must contain ${missingRequirements.join(', ')}`;
  }
  
  return null;
};

/**
 * Confirm password validator
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {string|null} Error message or null if valid
 */
export const confirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return null;
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

/**
 * Ethiopian ID number validator (basic format)
 * @param {string} idNumber - ID number to validate
 * @returns {string|null} Error message or null if valid
 */
export const ethiopianIdNumber = (idNumber) => {
  if (!idNumber) return null;
  
  // Basic Ethiopian ID format validation (can be enhanced)
  const idRegex = /^[A-Z0-9]{8,15}$/;
  if (!idRegex.test(idNumber)) {
    return 'Please enter a valid Ethiopian ID number';
  }
  return null;
};

/**
 * Family number validator
 * @param {string} familyNumber - Family number to validate
 * @returns {string|null} Error message or null if valid
 */
export const familyNumber = (familyNumber) => {
  if (!familyNumber) return null;
  
  const familyNumberRegex = /^FAM\d{6}$/;
  if (!familyNumberRegex.test(familyNumber)) {
    return 'Family number must be in format FAM000001';
  }
  return null;
};

/**
 * House number validator
 * @param {string} houseNumber - House number to validate
 * @returns {string|null} Error message or null if valid
 */
export const houseNumber = (houseNumber) => {
  if (!houseNumber) return null;
  
  const houseNumberRegex = /^HSE\d{6}$/;
  if (!houseNumberRegex.test(houseNumber)) {
    return 'House number must be in format HSE000001';
  }
  return null;
};

/**
 * Compose multiple validators
 * @param {...Function} validators - Validator functions
 * @returns {Function} Composed validator function
 */
export const composeValidators = (...validators) => (value, allValues) => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) return error;
  }
  return null;
};

/**
 * Create field validator
 * @param {Function[]} validators - Array of validator functions
 * @returns {Function} Field validator function
 */
export const createValidator = (validators) => (value, allValues) => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) return error;
  }
  return null;
};

// Pre-composed validators for common use cases
export const validators = {
  required: createValidator([required]),
  email: createValidator([required, email]),
  phone: createValidator([required, phone]),
  password: createValidator([required, minLength(8)]),
  strongPassword: createValidator([required, passwordStrength]),
  age: createValidator([required, age]),
  positiveNumber: createValidator([required, positiveNumber]),
  futureDate: createValidator([required, futureDate]),
  pastDate: createValidator([required, pastDate]),
  familyNumber: createValidator([required, familyNumber]),
  houseNumber: createValidator([required, houseNumber]),
  ethiopianId: createValidator([required, ethiopianIdNumber]),
};

export default {
  required,
  email,
  phone,
  minLength,
  maxLength,
  numeric,
  positiveNumber,
  age,
  futureDate,
  pastDate,
  dateRange,
  fileType,
  fileSize,
  passwordStrength,
  confirmPassword,
  ethiopianIdNumber,
  familyNumber,
  houseNumber,
  composeValidators,
  createValidator,
  validators,
};