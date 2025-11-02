import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { 
  IdCard, 
  Search, 
  User, 
  Camera, 
  Upload,
  Calendar,
  Droplets,
  Phone,
  FileText
} from 'lucide-react';

const AddIdCardForm = () => {
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, handleSubmit, validateField } = useForm({
    initialValues: {
      idNumber: '',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      idType: 'kebele',
      bloodType: '',
      emergencyContact: '',
      remarks: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.idNumber.trim()) errors.idNumber = 'ID card number is required';
      if (!values.issueDate) errors.issueDate = 'Issue date is required';
      if (!values.expiryDate) errors.expiryDate = 'Expiry date is required';
      if (!values.idType) errors.idType = 'ID type is required';
      if (!selectedIndividual) errors.individual = 'Please select an individual';
      
      // Date validation
      if (values.issueDate && values.expiryDate) {
        const issue = new Date(values.issueDate);
        const expiry = new Date(values.expiryDate);
        if (expiry <= issue) {
          errors.expiryDate = 'Expiry date must be after issue date';
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = {
          ...values,
          individualId: selectedIndividual?.id,
          photoUrl: photoPreview,
          signatureUrl: signaturePreview
        };
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('ID Card form submitted:', formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleSearch = async (query) => {
    if (query.length < 2) return;
    
    setIsSearching(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const mockResults = [
        { id: 1, name: 'John Doe', idNumber: 'ID001', phone: '+251911223344' },
        { id: 2, name: 'Jane Smith', idNumber: 'ID002', phone: '+251922334455' },
        { id: 3, name: 'Michael Johnson', idNumber: 'ID003', phone: '+251933445566' },
      ].filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.idNumber.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'photo') {
          setPhotoPreview(e.target.result);
        } else {
          setSignaturePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <IdCard className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue New ID Card</h1>
        <p className="text-gray-600">Fill in the information below to issue a new ID card</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Individual Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Find Individual</h2>
              <p className="text-gray-600 text-sm">Search for an individual to issue an ID card for</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>
              <button
                type="button"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Search Results */}
            {isSearching && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600">Searching individuals...</p>
              </div>
            )}

            {searchResults.length > 0 && !isSearching && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {searchResults.map((individual) => (
                  <div
                    key={individual.id}
                    className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{individual.name}</h4>
                        <p className="text-sm text-gray-600">ID: {individual.idNumber} | Phone: {individual.phone}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIndividual(individual);
                          setSearchResults([]);
                          handleChange({
                            target: { name: 'idNumber', value: `ID${individual.id}` }
                          });
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Individual */}
            {selectedIndividual && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Selected Individual</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {selectedIndividual.name} | 
                      <strong> ID:</strong> {selectedIndividual.idNumber} | 
                      <strong> Phone:</strong> {selectedIndividual.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.individual && (
              <p className="text-sm text-red-600">{errors.individual}</p>
            )}
          </div>
        </div>

        {/* ID Card Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <IdCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">ID Card Information</h2>
              <p className="text-gray-600 text-sm">ID card details and specifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={values.idNumber}
                onChange={handleChange}
                onBlur={() => validateField('idNumber')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.idNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter ID card number"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Card Type <span className="text-red-500">*</span>
              </label>
              <select
                name="idType"
                value={values.idType}
                onChange={handleChange}
                onBlur={() => validateField('idType')}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                  errors.idType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select ID Type</option>
                <option value="national">National ID</option>
                <option value="kebele">Kebele ID</option>
                <option value="student">Student ID</option>
                <option value="employee">Employee ID</option>
                <option value="other">Other</option>
              </select>
              {errors.idType && (
                <p className="mt-1 text-sm text-red-600">{errors.idType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="issueDate"
                  value={values.issueDate}
                  onChange={handleChange}
                  onBlur={() => validateField('issueDate')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                    errors.issueDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.issueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.issueDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="expiryDate"
                  value={values.expiryDate}
                  onChange={handleChange}
                  onBlur={() => validateField('expiryDate')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
                    errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              ID Card Photo
            </label>
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload ID Card Photo</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Click to upload photo or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs">
                      JPG, PNG or GIF (Max 5MB)
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Photo Preview
                </label>
                <div className="w-48 h-60 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center mx-auto">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Photo Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
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
        </div>

        {/* Additional Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
              <p className="text-gray-600 text-sm">Optional details for the ID card</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type (Optional)
              </label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="bloodType"
                  value={values.bloodType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="emergencyContact"
                  value={values.emergencyContact}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Name and phone number"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900"
                placeholder="Enter any additional information about this ID card"
              />
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
            disabled={isSubmitting || !selectedIndividual}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Issuing...</span>
              </>
            ) : (
              <>
                <IdCard className="w-5 h-5" />
                <span>Issue ID Card</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIdCardForm;