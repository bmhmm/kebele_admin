import { DATE_FORMATS, STORAGE_KEYS } from './constants';
import dayjs from 'dayjs';

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format string (defaults to DISPLAY format)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format date for API submission
 * @param {string|Date} date - Date to format
 * @returns {string} ISO date string
 */
export const formatDateForAPI = (date) => {
  if (!date) return '';
  return dayjs(date).format(DATE_FORMATS.API);
};

/**
 * Calculate age from birth date
 * @param {string|Date} birthDate - Birth date
 * @returns {number} Age in years
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  return dayjs().diff(dayjs(birthDate), 'year');
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone(obj[key]);
    });
    return clonedObj;
  }
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate Ethiopian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid Ethiopian phone number
 */
export const isValidEthiopianPhone = (phone) => {
  const ethiopianPhoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
  return ethiopianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Get color based on status
 * @param {string} status - Status value
 * @returns {string} Tailwind CSS color class
 */
export const getStatusColor = (status) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    issued: 'bg-green-100 text-green-800',
    'not-issued': 'bg-red-100 text-red-800',
    occupied: 'bg-green-100 text-green-800',
    vacant: 'bg-yellow-100 text-yellow-800',
    'under-construction': 'bg-blue-100 text-blue-800',
    damaged: 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get user from localStorage
 * @returns {Object|null} User object or null
 */
export const getStoredUser = () => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

/**
 * Save user to localStorage
 * @param {Object} user - User object to save
 */
export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

/**
 * Remove user from localStorage
 */
export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

/**
 * Get auth token from localStorage
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Save auth token to localStorage
 * @param {string} token - Auth token to save
 */
export const saveAuthToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

/**
 * Remove auth token from localStorage
 */
export const removeAuthToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate search query string from filters
 * @param {Object} filters - Filter object
 * @returns {string} Query string
 */
export const generateSearchQuery = (filters) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  return params.toString();
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string
 * @returns {Object} Parsed object
 */
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Validate file type
 * @param {File} file - File object
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} Is valid file type
 */
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File object
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} Is valid file size
 */
export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

/**
 * Convert object to FormData
 * @param {Object} data - Object to convert
 * @returns {FormData} FormData object
 */
export const objectToFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        data[key].forEach(item => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  return formData;
};

/**
 * Get error message from API response
 * @param {any} error - Error object
 * @returns {string} Error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

export default {
  formatDate,
  formatDateForAPI,
  calculateAge,
  generateId,
  debounce,
  deepClone,
  getInitials,
  formatFileSize,
  isValidEthiopianPhone,
  getStatusColor,
  getStoredUser,
  saveUserToStorage,
  removeUserFromStorage,
  getAuthToken,
  saveAuthToken,
  removeAuthToken,
  capitalizeWords,
  truncateText,
  generateSearchQuery,
  parseQueryString,
  isValidFileType,
  isValidFileSize,
  objectToFormData,
  getErrorMessage,
};