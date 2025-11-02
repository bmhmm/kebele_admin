import { useState, useCallback, useRef } from 'react';

// Validation functions
const validators = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },
  
  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },
  
  phone: (value) => {
    if (value && !/^(\+251|0)(9|7)[0-9]{8}$/.test(value.replace(/\s+/g, ''))) {
      return 'Please enter a valid Ethiopian phone number';
    }
    return null;
  },
  
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be less than ${max} characters`;
    }
    return null;
  },
  
  min: (min) => (value) => {
    if (value !== null && value !== undefined && value !== '' && Number(value) < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },
  
  max: (max) => (value) => {
    if (value !== null && value !== undefined && value !== '' && Number(value) > max) {
      return `Must be less than ${max}`;
    }
    return null;
  },
  
  numeric: (value) => {
    if (value && !/^\d+$/.test(value)) {
      return 'Must be a number';
    }
    return null;
  },
  
  pattern: (regex, message) => (value) => {
    if (value && !regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },
  
  match: (fieldName, message) => (value, allValues) => {
    if (value !== allValues[fieldName]) {
      return message || 'Fields do not match';
    }
    return null;
  },
};

// Main useForm hook
export const useForm = (options = {}) => {
  const {
    initialValues = {},
    validate,
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true,
    validateOnSubmit = true,
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  
  const formRef = useRef({
    initialValues: { ...initialValues },
    isDirty: false,
  });

  // Check if form has been modified
  const isDirty = useCallback(() => {
    return JSON.stringify(values) !== JSON.stringify(formRef.current.initialValues);
  }, [values]);

  // Check if form is valid
  const isValid = useCallback(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Field validation
  const validateField = useCallback((name, value, allValues = values) => {
    let fieldErrors = [];

    // Custom validation function
    if (validate) {
      const customErrors = validate(allValues);
      if (customErrors && customErrors[name]) {
        fieldErrors.push(customErrors[name]);
      }
    }

    // Built-in validators from field rules
    const fieldRules = options.fields?.[name]?.rules || [];
    fieldRules.forEach(rule => {
      if (typeof rule === 'string') {
        const error = validators[rule]?.(value, allValues);
        if (error) fieldErrors.push(error);
      } else if (typeof rule === 'function') {
        const error = rule(value, allValues);
        if (error) fieldErrors.push(error);
      } else if (rule && typeof rule === 'object') {
        const validator = validators[rule.type];
        if (validator) {
          const configuredValidator = typeof validator === 'function' 
            ? validator(rule.value) 
            : validator;
          const error = configuredValidator?.(value, allValues);
          if (error) fieldErrors.push(error);
        }
      }
    });

    const fieldError = fieldErrors.length > 0 ? fieldErrors[0] : null;
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError,
    }));

    return fieldError;
  }, [validate, values, options.fields]);

  // Validate all fields
  const validateForm = useCallback((formValues = values) => {
    const newErrors = {};

    // Custom validation
    if (validate) {
      const customErrors = validate(formValues);
      if (customErrors) {
        Object.assign(newErrors, customErrors);
      }
    }

    // Field-level validation
    if (options.fields) {
      Object.keys(options.fields).forEach(fieldName => {
        const fieldRules = options.fields[fieldName]?.rules || [];
        const value = formValues[fieldName];
        
        fieldRules.forEach(rule => {
          if (typeof rule === 'string') {
            const error = validators[rule]?.(value, formValues);
            if (error && !newErrors[fieldName]) {
              newErrors[fieldName] = error;
            }
          } else if (typeof rule === 'function') {
            const error = rule(value, formValues);
            if (error && !newErrors[fieldName]) {
              newErrors[fieldName] = error;
            }
          }
        });
      });
    }

    setErrors(newErrors);
    return newErrors;
  }, [validate, values, options.fields]);

  // Field change handler
  const handleChange = useCallback((event) => {
    const { name, value, type, checked, files } = event.target;
    
    let fieldValue;
    
    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files ? files[0] : null;
    } else if (type === 'number' || type === 'range') {
      fieldValue = value === '' ? '' : Number(value);
    } else {
      fieldValue = value;
    }

    setValues(prev => {
      const newValues = {
        ...prev,
        [name]: fieldValue,
      };
      
      // Validate on change if enabled
      if (validateOnChange) {
        validateField(name, fieldValue, newValues);
      }
      
      return newValues;
    });

    formRef.current.isDirty = true;
  }, [validateField, validateOnChange]);

  // Field blur handler
  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur if enabled
    if (validateOnBlur) {
      validateField(name, value);
    }
  }, [validateField, validateOnBlur]);

  // Set field value programmatically
  const setValue = useCallback((name, value) => {
    setValues(prev => {
      const newValues = {
        ...prev,
        [name]: value,
      };
      
      if (validateOnChange) {
        validateField(name, value, newValues);
      }
      
      return newValues;
    });
  }, [validateField, validateOnChange]);

  // Set multiple values
  const setValuesBatch = useCallback((newValues) => {
    setValues(prev => {
      const updatedValues = { ...prev, ...newValues };
      
      if (validateOnChange) {
        Object.keys(newValues).forEach(name => {
          validateField(name, newValues[name], updatedValues);
        });
      }
      
      return updatedValues;
    });
  }, [validateField, validateOnChange]);

  // Reset form
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setSubmitCount(0);
    formRef.current.initialValues = { ...newValues };
    formRef.current.isDirty = false;
  }, [initialValues]);

  // Form submission
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
      event.persist();
    }

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(values).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    try {
      // Validate form before submission
      let formErrors = {};
      if (validateOnSubmit) {
        formErrors = validateForm(values);
      }

      if (Object.keys(formErrors).length === 0) {
        await onSubmit?.(values, { reset, setErrors });
      } else {
        console.warn('Form validation failed:', formErrors);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission errors
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ 
          _submit: error.message || 'An error occurred during submission' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, reset, validateForm, validateOnSubmit]);

  // Get field props for input components
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] ?? '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : undefined,
  }), [values, handleChange, handleBlur, errors, touched]);

  // Check if field has error
  const hasError = useCallback((name) => {
    return touched[name] && errors[name];
  }, [touched, errors]);

  // Get field error
  const getError = useCallback((name) => {
    return touched[name] ? errors[name] : undefined;
  }, [touched, errors]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    
    // Methods
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setValues: setValuesBatch,
    validateField,
    validateForm,
    reset,
    getFieldProps,
    
    // Utilities
    hasError,
    getError,
    isDirty: isDirty(),
    isValid: isValid(),
    
    // Form status
    status: {
      isDirty: isDirty(),
      isValid: isValid(),
      isSubmitting,
      submitCount,
    },
  };
};

// Specialized hook for form with API submission
export const useApiForm = (options = {}) => {
  const { apiMethod, onSuccess, onError, ...formOptions } = options;
  const form = useForm(formOptions);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApiSubmit = useCallback(async (values, formHelpers) => {
    if (!apiMethod) {
      throw new Error('apiMethod is required for useApiForm');
    }

    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await apiMethod(values);
      setSubmitSuccess(true);
      await onSuccess?.(result, values, formHelpers);
      return result;
    } catch (error) {
      setSubmitError(error);
      await onError?.(error, values, formHelpers);
      
      // Set form errors from API response
      if (error.data && error.data.errors) {
        formHelpers.setErrors(error.data.errors);
      }
      
      throw error;
    }
  }, [apiMethod, onSuccess, onError]);

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleApiSubmit),
    submitError,
    submitSuccess,
    reset: () => {
      form.reset();
      setSubmitError(null);
      setSubmitSuccess(false);
    },
  };
};

export default useForm;