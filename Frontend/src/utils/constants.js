// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Application Constants
export const APP_CONSTANTS = {
  APP_NAME: 'Ginjo Guduru Kebele Administration',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@ginjoguduru.gov.et',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CLERK: 'clerk',
  VIEWER: 'viewer',
};

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

// Religion Options
export const RELIGION_OPTIONS = [
  { value: 'islam', label: 'Islam' },
  { value: 'orthodox', label: 'Orthodox Christian' },
  { value: 'protestant', label: 'Protestant' },
  { value: 'catholic', label: 'Catholic' },
  { value: 'other', label: 'Other' },
];

// Education Levels
export const EDUCATION_LEVELS = [
  { value: 'none', label: 'No Formal Education' },
  { value: 'primary', label: 'Primary School' },
  { value: 'secondary', label: 'Secondary School' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'masters', label: "Master's Degree" },
  { value: 'phd', label: 'PhD' },
];

// Relationship Types
export const RELATIONSHIP_TYPES = [
  { value: 'head', label: 'Head' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'other', label: 'Other Relative' },
];

// House Types
export const HOUSE_TYPES = [
  { value: 'residential', label: 'Residential', icon: '🏠' },
  { value: 'commercial', label: 'Commercial', icon: '🏪' },
  { value: 'mixed', label: 'Mixed Use', icon: '🏢' },
  { value: 'government', label: 'Government', icon: '🏛️' },
  { value: 'religious', label: 'Religious', icon: '⛪' },
  { value: 'other', label: 'Other', icon: '🔧' },
];

// House Statuses
export const HOUSE_STATUSES = [
  { value: 'occupied', label: 'Occupied', color: 'green' },
  { value: 'vacant', label: 'Vacant', color: 'yellow' },
  { value: 'under-construction', label: 'Under Construction', color: 'blue' },
  { value: 'damaged', label: 'Damaged', color: 'red' },
];

// ID Card Types
export const ID_CARD_TYPES = [
  { value: 'national', label: 'National ID' },
  { value: 'kebele', label: 'Kebele ID' },
  { value: 'student', label: 'Student ID' },
  { value: 'employee', label: 'Employee ID' },
  { value: 'other', label: 'Other' },
];

// Blood Types
export const BLOOD_TYPES = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

// Search Types
export const SEARCH_TYPES = [
  { value: 'all', label: 'All', icon: '🌐' },
  { value: 'individual', label: 'Individuals', icon: '👤' },
  { value: 'family', label: 'Families', icon: '👨‍👩‍👧‍👦' },
  { value: 'house', label: 'Houses', icon: '🏠' },
  { value: 'id_card', label: 'ID Cards', icon: '🪪' },
];

// Navigation Items
export const NAVIGATION_ITEMS = [
  { path: '/', label: 'Dashboard', icon: '🏠', exact: true },
  { path: '/add-individual', label: 'Add Individual', icon: '👤' },
  { path: '/add-family', label: 'Add Family', icon: '👨‍👩‍👧‍👦' },
  { path: '/add-house', label: 'Add House', icon: '🏠' },
  { path: '/add-id-card', label: 'Add ID Card', icon: '🪪' },
  { path: '/list-individuals', label: 'List Individuals', icon: '📋' },
  { path: '/list-families', label: 'List Families', icon: '📑' },
  { path: '/search', label: 'Search', icon: '🔍' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

// Table Pagination
export const TABLE_CONFIG = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 25, 50],
  SORT_ORDERS: {
    ASC: 'asc',
    DESC: 'desc',
  },
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: 'Must be at least {min} characters',
  MAX_LENGTH: 'Must be less than {max} characters',
  NUMERIC: 'Must be a valid number',
  POSITIVE_NUMBER: 'Must be a positive number',
  FUTURE_DATE: 'Date must be in the future',
  PAST_DATE: 'Date must be in the past',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'kebele_auth_token',
  USER_DATA: 'kebele_user_data',
  THEME_PREFERENCE: 'kebele_theme',
  LANGUAGE: 'kebele_language',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
};

// Export all constants
export default {
  API_CONFIG,
  APP_CONSTANTS,
  USER_ROLES,
  GENDER_OPTIONS,
  RELIGION_OPTIONS,
  EDUCATION_LEVELS,
  RELATIONSHIP_TYPES,
  HOUSE_TYPES,
  HOUSE_STATUSES,
  ID_CARD_TYPES,
  BLOOD_TYPES,
  SEARCH_TYPES,
  NAVIGATION_ITEMS,
  TABLE_CONFIG,
  VALIDATION_MESSAGES,
  NOTIFICATION_TYPES,
  STORAGE_KEYS,
  DATE_FORMATS,
};