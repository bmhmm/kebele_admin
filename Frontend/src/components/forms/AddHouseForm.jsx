import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { 
  Home, 
  Building, 
  User, 
  Phone, 
  MapPin,
  Calendar,
  Info
} from 'lucide-react';

const AddHouseForm = () => {
  const [selectedHouseType, setSelectedHouseType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const houseTypes = [
    { value: 'residential', label: 'Residential', icon: '🏠', description: 'For living purposes' },
    { value: 'commercial', label: 'Commercial', icon: '🏪', description: 'For business activities' },
    { value: 'mixed', label: 'Mixed Use', icon: '🏢', description: 'Both residential and commercial' },
    { value: 'government', label: 'Government', icon: '🏛️', description: 'Government buildings' },
    { value: 'religious', label: 'Religious', icon: '⛪', description: 'Places of worship' },
    { value: 'other', label: 'Other', icon: '🏘️', description: 'Other types' }
  ];

  const statusTypes = [
    { value: 'occupied', label: 'Occupied', color: 'bg-green-500' },
    { value: 'vacant', label: 'Vacant', color: 'bg-yellow-500' },
    { value: 'under-construction', label: 'Under Construction', color: 'bg-blue-500' },
    { value: 'damaged', label: 'Damaged', color: 'bg-red-500' }
  ];

  const { values, errors, handleChange, handleSubmit, validateField } = useForm({
    initialValues: {
      houseNumber: '',
      area: '',
      doorCount: '',
      constructionYear: new Date().getFullYear(),
      ownerName: '',
      ownerId: '',
      ownerPhone: '',
      zone: '',
      kebele: 'Ginjo Guduru',
      city: 'Ginjo Guduru',
      region: '',
      remarks: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
      if (!values.area || values.area < 1) errors.area = 'Valid area is required';
      if (!values.doorCount || values.doorCount < 1) errors.doorCount = 'Valid door count is required';
      if (!values.constructionYear) errors.constructionYear = 'Construction year is required';
      if (!values.ownerName.trim()) errors.ownerName = 'Owner name is required';
      if (!values.ownerPhone.trim()) errors.ownerPhone = 'Owner phone is required';
      if (!values.zone.trim()) errors.zone = 'Zone is required';
      if (!values.region.trim()) errors.region = 'Region is required';
      if (!selectedHouseType) errors.houseType = 'House type is required';
      if (!selectedStatus) errors.houseStatus = 'House status is required';
      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = {
          ...values,
          houseType: selectedHouseType,
          houseStatus: selectedStatus
        };
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('House form submitted:', formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New House</h1>
        <p className="text-gray-600">Fill in the information below to register a new house in the system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* House Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">House Information</h2>
              <p className="text-gray-600 text-sm">Basic house details and specifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (Square Meters) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={values.area}
                onChange={handleChange}
                onBlur={() => validateField('area')}
                min="1"
                step="0.1"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.area ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter area"
              />
              {errors.area && (
                <p className="mt-1 text-sm text-red-600">{errors.area}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Door Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="doorCount"
                value={values.doorCount}
                onChange={handleChange}
                onBlur={() => validateField('doorCount')}
                min="1"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.doorCount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter door count"
              />
              {errors.doorCount && (
                <p className="mt-1 text-sm text-red-600">{errors.doorCount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Construction Year <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="constructionYear"
                  value={values.constructionYear}
                  onChange={handleChange}
                  onBlur={() => validateField('constructionYear')}
                  min="1900"
                  max="2099"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                    errors.constructionYear ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.constructionYear && (
                <p className="mt-1 text-sm text-red-600">{errors.constructionYear}</p>
              )}
            </div>
          </div>

          {/* House Type Selection */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              House Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {houseTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedHouseType(type.value)}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                    selectedHouseType === type.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
            {errors.houseType && (
              <p className="mt-2 text-sm text-red-600">{errors.houseType}</p>
            )}
          </div>

          {/* Status Selection */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              House Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statusTypes.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setSelectedStatus(status.value)}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                    selectedStatus === status.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{status.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {errors.houseStatus && (
              <p className="mt-2 text-sm text-red-600">{errors.houseStatus}</p>
            )}
          </div>
        </div>

        {/* Owner Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Owner Information</h2>
              <p className="text-gray-600 text-sm">Details about the house owner</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                value={values.ownerName}
                onChange={handleChange}
                onBlur={() => validateField('ownerName')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.ownerName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter owner name"
              />
              {errors.ownerName && (
                <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner ID (if registered)
              </label>
              <input
                type="text"
                name="ownerId"
                value={values.ownerId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter owner ID"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="ownerPhone"
                  value={values.ownerPhone}
                  onChange={handleChange}
                  onBlur={() => validateField('ownerPhone')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.ownerPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+251 9XX XXX XXX"
                />
              </div>
              {errors.ownerPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.ownerPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Location Information</h2>
              <p className="text-gray-600 text-sm">House location details</p>
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

        {/* Additional Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
              <p className="text-gray-600 text-sm">Any additional remarks or notes</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={values.remarks}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900"
              placeholder="Enter any additional information about the house..."
            />
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
            className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <Home className="w-5 h-5" />
                <span>Register House</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHouseForm;