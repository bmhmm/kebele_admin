import { useState, useCallback, useRef } from 'react';

// API Base URL - would typically come from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Custom fetch wrapper with error handling
const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Add body to config if it exists and is not FormData
  if (config.body && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle different error types
      const error = new Error(
        data.message || data.error || `HTTP error! status: ${response.status}`
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return { data, status: response.status, headers: response.headers };
  } catch (error) {
    // Network errors or other fetch failures
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your connection.');
    }
    throw error;
  }
};

// Main useApi hook
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);

  // Generic request method
  const request = useCallback(async (endpoint, options = {}) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);

    try {
      const result = await apiClient(endpoint, {
        ...options,
        signal: abortControllerRef.current.signal,
      });
      
      setData(result.data);
      return result;
    } catch (err) {
      // Ignore abort errors
      if (err.name === 'AbortError') {
        return;
      }
      
      setError(err);
      throw err;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Specific HTTP methods
  const get = useCallback((endpoint, options = {}) => 
    request(endpoint, { ...options, method: 'GET' }), [request]);

  const post = useCallback((endpoint, body, options = {}) => 
    request(endpoint, { ...options, method: 'POST', body }), [request]);

  const put = useCallback((endpoint, body, options = {}) => 
    request(endpoint, { ...options, method: 'PUT', body }), [request]);

  const patch = useCallback((endpoint, body, options = {}) => 
    request(endpoint, { ...options, method: 'PATCH', body }), [request]);

  const del = useCallback((endpoint, options = {}) => 
    request(endpoint, { ...options, method: 'DELETE' }), [request]);

  // Upload file method
  const upload = useCallback(async (endpoint, formData, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiClient(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type for FormData, let browser set it
          ...(options.headers || {}),
        },
        ...options,
      });
      
      setData(result.data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  // Reset hook state
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    // State
    loading,
    error,
    data,
    
    // Methods
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    
    // Utilities
    clearError,
    reset,
  };
};

// Specialized hook for common CRUD operations
export const useCrudApi = (resource) => {
  const api = useApi();

  const list = useCallback((queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const endpoint = queryString ? `/${resource}?${queryString}` : `/${resource}`;
    return api.get(endpoint);
  }, [resource, api]);

  const getById = useCallback((id) => 
    api.get(`/${resource}/${id}`), [resource, api]);

  const create = useCallback((data) => 
    api.post(`/${resource}`, data), [resource, api]);

  const update = useCallback((id, data) => 
    api.put(`/${resource}/${id}`, data), [resource, api]);

  const partialUpdate = useCallback((id, data) => 
    api.patch(`/${resource}/${id}`, data), [resource, api]);

  const remove = useCallback((id) => 
    api.delete(`/${resource}/${id}`), [resource, api]);

  return {
    ...api,
    list,
    getById,
    create,
    update,
    partialUpdate,
    remove,
  };
};

// Hook for handling API calls with retry logic
export const useApiWithRetry = (maxRetries = 3) => {
  const api = useApi();
  const [retryCount, setRetryCount] = useState(0);

  const requestWithRetry = useCallback(async (endpoint, options = {}, currentRetry = 0) => {
    try {
      return await api.request(endpoint, options);
    } catch (error) {
      // Only retry on network errors or 5xx status codes
      const shouldRetry = 
        error.status >= 500 || 
        error.message.includes('Network error') ||
        error.message.includes('Failed to fetch');

      if (shouldRetry && currentRetry < maxRetries) {
        const delay = Math.pow(2, currentRetry) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        setRetryCount(currentRetry + 1);
        return requestWithRetry(endpoint, options, currentRetry + 1);
      }
      throw error;
    }
  }, [api, maxRetries]);

  return {
    ...api,
    request: requestWithRetry,
    retryCount,
  };
};

export default useApi;