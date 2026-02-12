// import React, { useState } from 'react';
// import { useForm } from '../../hooks/useForm';
// import { 
//   IdCard, 
//   Search, 
//   User, 
//   Camera, 
//   Upload,
//   Calendar,
//   Droplets,
//   Phone,
//   FileText
// } from 'lucide-react';

// const AddIdCardForm = () => {
//   const [selectedIndividual, setSelectedIndividual] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [signaturePreview, setSignaturePreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { values, errors, handleChange, handleSubmit, validateField } = useForm({
//     initialValues: {
//       idNumber: '',
//       issueDate: new Date().toISOString().split('T')[0],
//       expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
//       idType: 'kebele',
//       bloodType: '',
//       emergencyContact: '',
//       remarks: ''
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.idNumber.trim()) errors.idNumber = 'ID card number is required';
//       if (!values.issueDate) errors.issueDate = 'Issue date is required';
//       if (!values.expiryDate) errors.expiryDate = 'Expiry date is required';
//       if (!values.idType) errors.idType = 'ID type is required';
//       if (!selectedIndividual) errors.individual = 'Please select an individual';

//       // Date validation
//       if (values.issueDate && values.expiryDate) {
//         const issue = new Date(values.issueDate);
//         const expiry = new Date(values.expiryDate);
//         if (expiry <= issue) {
//           errors.expiryDate = 'Expiry date must be after issue date';
//         }
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       try {
//         const formData = {
//           ...values,
//           individualId: selectedIndividual?.id,
//           photoUrl: photoPreview,
//           signatureUrl: signaturePreview
//         };
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         console.log('ID Card form submitted:', formData);
//       } catch (error) {
//         console.error('Submission error:', error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   });

//   const handleSearch = async (query) => {
//     if (query.length < 2) return;

//     setIsSearching(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Mock search results
//       const mockResults = [
//         { id: 1, name: 'John Doe', idNumber: 'ID001', phone: '+251911223344' },
//         { id: 2, name: 'Jane Smith', idNumber: 'ID002', phone: '+251922334455' },
//         { id: 3, name: 'Michael Johnson', idNumber: 'ID003', phone: '+251933445566' },
//       ].filter(item => 
//         item.name.toLowerCase().includes(query.toLowerCase()) ||
//         item.idNumber.toLowerCase().includes(query.toLowerCase())
//       );

//       setSearchResults(mockResults);
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleFileUpload = (event, type) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (type === 'photo') {
//           setPhotoPreview(e.target.result);
//         } else {
//           setSignaturePreview(e.target.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <IdCard className="w-8 h-8 text-purple-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue New ID Card</h1>
//         <p className="text-gray-600">Fill in the information below to issue a new ID card</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Individual Search Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//               <Search className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Find Individual</h2>
//               <p className="text-gray-600 text-sm">Search for an individual to issue an ID card for</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex space-x-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by name or ID..."
//                   onChange={(e) => handleSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2"
//               >
//                 <Search className="w-4 h-4" />
//                 <span>Search</span>
//               </button>
//             </div>

//             {/* Search Results */}
//             {isSearching && (
//               <div className="text-center py-8">
//                 <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                 <p className="text-gray-600">Searching individuals...</p>
//               </div>
//             )}

//             {searchResults.length > 0 && !isSearching && (
//               <div className="border border-gray-200 rounded-xl overflow-hidden">
//                 {searchResults.map((individual) => (
//                   <div
//                     key={individual.id}
//                     className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h4 className="font-medium text-gray-900">{individual.name}</h4>
//                         <p className="text-sm text-gray-600">ID: {individual.idNumber} | Phone: {individual.phone}</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedIndividual(individual);
//                           setSearchResults([]);
//                           handleChange({
//                             target: { name: 'idNumber', value: `ID${individual.id}` }
//                           });
//                         }}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
//                       >
//                         Select
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Selected Individual */}
//             {selectedIndividual && (
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">Selected Individual</h4>
//                     <p className="text-sm text-gray-600">
//                       <strong>Name:</strong> {selectedIndividual.name} | 
//                       <strong> ID:</strong> {selectedIndividual.idNumber} | 
//                       <strong> Phone:</strong> {selectedIndividual.phone}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {errors.individual && (
//               <p className="text-sm text-red-600">{errors.individual}</p>
//             )}
//           </div>
//         </div>

//         {/* ID Card Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
//               <IdCard className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">ID Card Information</h2>
//               <p className="text-gray-600 text-sm">ID card details and specifications</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 ID Card Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="idNumber"
//                 value={values.idNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('idNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
//                   errors.idNumber ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter ID card number"
//               />
//               {errors.idNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 ID Card Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="idType"
//                 value={values.idType}
//                 onChange={handleChange}
//                 onBlur={() => validateField('idType')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
//                   errors.idType ? 'border-red-300' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select ID Type</option>
//                 <option value="national">National ID</option>
//                 <option value="kebele">Kebele ID</option>
//                 <option value="student">Student ID</option>
//                 <option value="employee">Employee ID</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.idType && (
//                 <p className="mt-1 text-sm text-red-600">{errors.idType}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Issue Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="date"
//                   name="issueDate"
//                   value={values.issueDate}
//                   onChange={handleChange}
//                   onBlur={() => validateField('issueDate')}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
//                     errors.issueDate ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//               {errors.issueDate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.issueDate}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Expiry Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="date"
//                   name="expiryDate"
//                   value={values.expiryDate}
//                   onChange={handleChange}
//                   onBlur={() => validateField('expiryDate')}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${
//                     errors.expiryDate ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//               {errors.expiryDate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
//               )}
//             </div>
//           </div>

//           {/* Photo Upload */}
//           <div className="mt-8">
//             <label className="block text-sm font-medium text-gray-700 mb-4">
//               ID Card Photo
//             </label>
//             <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
//               <div className="flex-1">
//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleFileUpload(e, 'photo')}
//                     className="hidden"
//                     id="photo-upload"
//                   />
//                   <label htmlFor="photo-upload" className="cursor-pointer">
//                     <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Camera className="w-8 h-8 text-blue-600" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Upload ID Card Photo</h3>
//                     <p className="text-gray-600 text-sm mb-4">
//                       Click to upload photo or drag and drop
//                     </p>
//                     <p className="text-gray-500 text-xs">
//                       JPG, PNG or GIF (Max 5MB)
//                     </p>
//                   </label>
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Photo Preview
//                 </label>
//                 <div className="w-48 h-60 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center mx-auto">
//                   {photoPreview ? (
//                     <img
//                       src={photoPreview}
//                       alt="Photo Preview"
//                       className="w-full h-full object-cover rounded-xl"
//                     />
//                   ) : (
//                     <div className="text-center text-gray-500">
//                       <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                       <p className="text-sm">No photo selected</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
//               <FileText className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
//               <p className="text-gray-600 text-sm">Optional details for the ID card</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Blood Type (Optional)
//               </label>
//               <div className="relative">
//                 <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   name="bloodType"
//                   value={values.bloodType}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 >
//                   <option value="">Select Blood Type</option>
//                   {bloodTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Emergency Contact (Optional)
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   name="emergencyContact"
//                   value={values.emergencyContact}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                   placeholder="Name and phone number"
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Remarks
//               </label>
//               <textarea
//                 name="remarks"
//                 value={values.remarks}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900"
//                 placeholder="Enter any additional information about this ID card"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting || !selectedIndividual}
//             className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Issuing...</span>
//               </>
//             ) : (
//               <>
//                 <IdCard className="w-5 h-5" />
//                 <span>Issue ID Card</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddIdCardForm;






import React, { useState } from 'react';
import { Search, User, Calendar, Droplet, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

const AddIdCardForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [formData, setFormData] = useState({
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0],
    blood_type: 'A+',
    emergency_contact: '',
    region: 'Oromia',
    zone: 'Jimma',
    woreda: '',
    kebele: 'Ginjo Guduru',
    house_number: '',
    status: 'issued'
  });
  const [loading, setLoading] = useState(false);

  // REMOVED the duplicate useState that was inside handleSubmit

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/id-cards/search-individuals?query=${encodeURIComponent(searchQuery)}`
      );

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result.data || []);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIndividual = (individual) => {
    setSelectedIndividual(individual);
    setSearchResults([]);

    // Auto-fill address from individual data
    setFormData(prev => ({
      ...prev,
      house_number: individual.house_number || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIndividual) {
      alert('Please select an individual first');
      return;
    }

    // FIXED: Removed the useState call from here
    // Just prepare the data directly
    const submitData = {
      individual_id: selectedIndividual.id,
      blood_type: formData.blood_type,
      emergency_contact: formData.emergency_contact,
      place_of_birth: 'Jimma Zone, Oromiya', // Fixed: Add this field
      residence_address: 'Ginjo Guduru, Jimma', // Fixed: Add this field
      kebele: formData.kebele,
      house_number: formData.house_number || selectedIndividual.house_number,
      status: formData.status,
      issue_date: formData.issue_date,
      expiry_date: formData.expiry_date
    };

    console.log('Submitting ID card data:', submitData);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/id-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      console.log('Response:', result);

      if (result.success) {
        alert(`✅ ID Card issued successfully!\nCard Number: ${result.data.card_number}`);
        // Reset form
        setSelectedIndividual(null);
        setFormData({
          issue_date: new Date().toISOString().split('T')[0],
          expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0],
          blood_type: 'A+',
          emergency_contact: '',
          region: 'Oromia',
          zone: '',
          woreda: '',
          kebele: '',
          house_number: '',
          status: 'issued'
        });
        setSearchQuery('');
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to issue ID card. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const ethiopianRegions = [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa',
    'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali',
    'South West Ethiopia', 'Southern Nations, Nationalities, and Peoples', 'Tigray'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Search Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-3">Find Individual</h3>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, family number, or house number"
              // className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            />
          </div>
          <Button
            type="button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 border border-gray-200 rounded-lg bg-white max-h-60 overflow-y-auto">
            {searchResults.map((individual) => (
              <div
                key={individual.id}
                className="p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                onClick={() => handleSelectIndividual(individual)}
              >
                <div className="flex items-center space-x-3">
                  {individual.photo_url ? (
                    <img
                      src={`http://localhost:5000${individual.photo_url}`}
                      alt={individual.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {individual.first_name} {individual.last_name}
                    </p>
                    <p className="text-sm text-gray-900">
                      Phone: {individual.phone} | Family: {individual.family_number} | House: {individual.house_number}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Individual */}
        {selectedIndividual && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedIndividual.photo_url ? (
                  <img
                    src={`http://localhost:5000${selectedIndividual.photo_url}`}
                    alt={selectedIndividual.first_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">
                    {selectedIndividual.first_name} {selectedIndividual.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    DOB: {new Date(selectedIndividual.dob).toLocaleDateString()} |
                    Gender: {selectedIndividual.gender} |
                    Phone: {selectedIndividual.phone}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedIndividual(null)}
              >
                Change
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ID Card Details - Only show if individual is selected */}
      {selectedIndividual && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">ID Card Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Issue & Expiry Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Issue Date
              </label>
              <input
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Expiry Date (10 years)
              </label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            {/* Blood Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Droplet className="inline w-4 h-4 mr-1" />
                Blood Type
              </label>
              <select
                value={formData.blood_type}
                onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Emergency Contact
              </label>
              <input
                type="tel"
                value={formData.emergency_contact}
                onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                placeholder="+251 XXX XXX XXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              >
                {ethiopianRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone
              </label>
              <input
                type="text"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                placeholder="e.g., East Welega, Jimma"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
            </div>

            {/* Woreda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Woreda
              </label>
              <input
                type="text"
                value={formData.woreda}
                onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                placeholder="e.g., Guduru, Manna"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
              />
            </div>

            {/* Kebele */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kebele
              </label>
              <input
                type="text"
                value={formData.kebele}
                onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                placeholder="e.g., Ginjo, Biftu"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
            >
              <option value="issued">Issued (Ready for pickup)</option>
              <option value="pending">Pending (In printing)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || !selectedIndividual}
            >
              {loading ? 'Issuing ID Card...' : 'Issue National ID Card'}
            </Button>
            <p className="text-sm text-gray-500 text-center mt-2">
              Card number will be automatically generated in format: GG-YYYY-XXXXXX
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddIdCardForm;