import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';

import {
  User,
  Home,
  Phone,
  Camera,
  Upload,
  Calendar,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const AddIndividualForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, handleSubmit, validateField } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      dob: '',
      age: '',
      gender: '',
      religion: '',
      nationality: 'ethiopian',
      occupation: '',
      education: '',
      familyNumber: '',
      houseNumber: '',
      relationship: '',
      phone: '',
      email: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName.trim()) errors.firstName = 'First name is required';
      if (!values.lastName.trim()) errors.lastName = 'Last name is required';
      if (!values.dob) errors.dob = 'Date of birth is required';
      if (!values.age || values.age < 1 || values.age > 120) errors.age = 'Valid age is required';
      if (!values.gender) errors.gender = 'Gender is required';
      if (!values.religion) errors.religion = 'Religion is required';
      if (!values.occupation.trim()) errors.occupation = 'Occupation is required';
      if (!values.education) errors.education = 'Education level is required';
      if (!values.familyNumber.trim()) errors.familyNumber = 'Family number is required';
      if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
      if (!values.relationship) errors.relationship = 'Relationship is required';
      if (!values.phone.trim()) errors.phone = 'Phone number is required';

      // Phone validation for Ethiopian format
      const phoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
      if (values.phone && !phoneRegex.test(values.phone.replace(/\s+/g, ''))) {
        errors.phone = 'Please enter a valid Ethiopian phone number';
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (values.email && !emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }

      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();

        // Append all form fields
        Object.keys(values).forEach(key => {
          if (values[key] !== null && values[key] !== undefined) {
            formData.append(key, values[key]);
          }
        });

        // Append photo if exists
        if (photoFile) {
          formData.append('photo', photoFile);
        }

        const response = await fetch('http://localhost:5000/api/individuals', {
          method: 'POST',
          body: formData,
          // Note: Don't set Content-Type header for FormData, browser will set it automatically with boundary
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to submit form');
        }

        // Handle success
        console.log('Individual added successfully:', result);
        alert('Individual registered successfully!');

        // Reset form
        // You can add form reset logic here
        window.location.reload(); // Simple reload for demo

      } catch (error) {
        console.error('Submission error:', error);
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, and GIF images are allowed');
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoFile(null);
    // Reset file input
    const fileInput = document.getElementById('photo-upload');
    if (fileInput) fileInput.value = '';
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDobChange = (e) => {
    handleChange(e);
    if (e.target.value) {
      const age = calculateAge(e.target.value);
      handleChange({ target: { name: 'age', value: age } });
    }
  };

  const handleAgeChange = (e) => {
    handleChange(e);
    if (e.target.value) {
      const birthYear = new Date().getFullYear() - parseInt(e.target.value);
      handleChange({ target: { name: 'dob', value: `${birthYear}-01-01` } });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Individual</h1>
        <p className="text-gray-800">Register a new individual in the kebele system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <p className="text-gray-600 text-sm">Basic details about the individual</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={() => validateField('firstName')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={() => validateField('lastName')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChange={handleDobChange}
                  onBlur={() => validateField('dob')}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.dob ? 'border-red-300' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleAgeChange}
                onBlur={() => validateField('age')}
                min="1"
                max="120"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.age ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={() => validateField('gender')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.gender ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion <span className="text-red-500">*</span>
              </label>
              <select
                name="religion"
                value={values.religion}
                onChange={handleChange}
                onBlur={() => validateField('religion')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.religion ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Religion</option>
                <option value="islam">Islam</option>
                <option value="orthodox">Orthodox Christian</option>
                <option value="protestant">Protestant</option>
                <option value="catholic">Catholic</option>
                <option value="other">Other</option>
              </select>
              {errors.religion && (
                <p className="mt-1 text-sm text-red-600">{errors.religion}</p>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <select
                name="nationality"
                value={values.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              >
                <option value="ethiopian">Ethiopian</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={() => validateField('occupation')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.occupation ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter occupation"
                />
              </div>
              {errors.occupation && (
                <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
              )}
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="education"
                  value={values.education}
                  onChange={handleChange}
                  onBlur={() => validateField('education')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.education ? 'border-red-300' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select Education Level</option>
                  <option value="none">No Formal Education</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              {errors.education && (
                <p className="mt-1 text-sm text-red-600">{errors.education}</p>
              )}
            </div>
          </div>
        </div>

        {/* Family & Housing Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Family & Housing Information</h2>
              <p className="text-gray-600 text-sm">Family and residence details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Family Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="familyNumber"
                value={values.familyNumber}
                onChange={handleChange}
                onBlur={() => validateField('familyNumber')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.familyNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter family number"
              />
              {errors.familyNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.familyNumber}</p>
              )}
            </div>

            {/*adding father's name field*/}


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father's Name (For ID Card)
              </label>
              <input
                type="text"
                name="fatherName"
                value={values.fatherName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Father's name (will appear on ID card)"
              />
            </div>
            {/* ending father's name fiels here*/}

            {/* House Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="houseNumber"
                value={values.houseNumber}
                onChange={handleChange}
                onBlur={() => validateField('houseNumber')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.houseNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter house number"
              />
              {errors.houseNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
              )}
            </div>

            {/* Relationship */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship to Family Head <span className="text-red-500">*</span>
              </label>
              <select
                name="relationship"
                value={values.relationship}
                onChange={handleChange}
                onBlur={() => validateField('relationship')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.relationship ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Relationship</option>
                <option value="head">Head</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other Relative</option>
              </select>
              {errors.relationship && (
                <p className="mt-1 text-sm text-red-600">{errors.relationship}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              <p className="text-gray-600 text-sm">Phone and email details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={() => validateField('phone')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="+251 9XX XXX XXX"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={() => validateField('email')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="example@domain.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Photo Upload Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Photo</h2>
              <p className="text-gray-600 text-sm">Upload individual's photo (Max 5MB)</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Upload Area */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photo</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 text-xs">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Preview */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Photo Preview
              </label>
              <div className="w-48 h-60 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center mx-auto relative">
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No photo selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                <span>Save Individual</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIndividualForm;



























