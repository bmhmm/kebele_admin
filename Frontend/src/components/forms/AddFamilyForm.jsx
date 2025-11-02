import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { 
  Users, 
  User, 
  Home, 
  Phone, 
  MapPin,
  Plus,
  Trash2
} from 'lucide-react';

const AddFamilyForm = () => {
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, handleSubmit, validateField } = useForm({
    initialValues: {
      familyNumber: '',
      houseNumber: '',
      headFirstName: '',
      headLastName: '',
      headGender: '',
      headId: '',
      headPhone: '',
      zone: '',
      kebele: 'Ginjo Guduru',
      city: 'Ginjo Guduru',
      region: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.familyNumber.trim()) errors.familyNumber = 'Family number is required';
      if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
      if (!values.headFirstName.trim()) errors.headFirstName = 'Head first name is required';
      if (!values.headLastName.trim()) errors.headLastName = 'Head last name is required';
      if (!values.headGender) errors.headGender = 'Head gender is required';
      if (!values.headPhone.trim()) errors.headPhone = 'Head phone number is required';
      if (!values.zone.trim()) errors.zone = 'Zone is required';
      if (!values.region.trim()) errors.region = 'Region is required';
      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = {
          ...values,
          members: familyMembers
        };
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Family form submitted:', formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const addFamilyMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      relationship: '',
      idNumber: ''
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const removeFamilyMember = (id) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter(member => member.id !== id));
    }
  };

  const updateFamilyMember = (id, field, value) => {
    setFamilyMembers(familyMembers.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
        <p className="text-gray-600">Fill in the information below to register a new family in the system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Family Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
              <p className="text-gray-600 text-sm">Basic family details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.familyNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter family number"
              />
              {errors.familyNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.familyNumber}</p>
              )}
            </div>

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
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.houseNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter house number"
              />
              {errors.houseNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Family Head Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Family Head Information</h2>
              <p className="text-gray-600 text-sm">Details about the family head</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="headFirstName"
                value={values.headFirstName}
                onChange={handleChange}
                onBlur={() => validateField('headFirstName')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.headFirstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
              />
              {errors.headFirstName && (
                <p className="mt-1 text-sm text-red-600">{errors.headFirstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="headLastName"
                value={values.headLastName}
                onChange={handleChange}
                onBlur={() => validateField('headLastName')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.headLastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
              />
              {errors.headLastName && (
                <p className="mt-1 text-sm text-red-600">{errors.headLastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="headGender"
                value={values.headGender}
                onChange={handleChange}
                onBlur={() => validateField('headGender')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.headGender ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.headGender && (
                <p className="mt-1 text-sm text-red-600">{errors.headGender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Number (if exists)
              </label>
              <input
                type="text"
                name="headId"
                value={values.headId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter ID number"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave blank if the family head is not registered yet
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="headPhone"
                  value={values.headPhone}
                  onChange={handleChange}
                  onBlur={() => validateField('headPhone')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.headPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+251 9XX XXX XXX"
                />
              </div>
              {errors.headPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.headPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Family Members Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Family Members</h2>
              <p className="text-gray-600 text-sm">Add all family members</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Member Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Relationship</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID (if exists)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {familyMembers.map((member, index) => (
                  <tr key={member.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Member Name"
                        readOnly={member.relationship === 'head'}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={member.relationship}
                        onChange={(e) => updateFamilyMember(member.id, 'relationship', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        disabled={member.relationship === 'head'}
                      >
                        <option value="head">Head</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="other">Other Relative</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={member.idNumber}
                        onChange={(e) => updateFamilyMember(member.id, 'idNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="ID Number"
                      />
                    </td>
                    <td className="py-3 px-4">
                      {member.relationship !== 'head' && (
                        <button
                          type="button"
                          onClick={() => removeFamilyMember(member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addFamilyMember}
            className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Member</span>
          </button>
        </div>

        {/* Address Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
              <p className="text-gray-600 text-sm">Family residence location</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zone"
                value={values.zone}
                onChange={handleChange}
                onBlur={() => validateField('zone')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.zone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter zone"
              />
              {errors.zone && (
                <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kebele <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kebele"
                value={values.kebele}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="region"
                value={values.region}
                onChange={handleChange}
                onBlur={() => validateField('region')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.region ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter region"
              />
              {errors.region && (
                <p className="mt-1 text-sm text-red-600">{errors.region}</p>
              )}
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
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <Users className="w-5 h-5" />
                <span>Register Family</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFamilyForm;