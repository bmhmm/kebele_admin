// import React, { useState } from 'react';
// import { useForm } from '../../hooks/useForm';
// import {
//   Users,
//   User,
//   Home,
//   Phone,
//   MapPin,
//   Plus,
//   Trash2
// } from 'lucide-react';

// const AddFamilyForm = () => {
//   const [familyMembers, setFamilyMembers] = useState([
//     { id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { values, errors, handleChange, handleSubmit, validateField } = useForm({
//     initialValues: {
//       familyNumber: '',
//       houseNumber: '',
//       headFirstName: '',
//       headLastName: '',
//       headGender: '',
//       head_id: '',
//       headPhone: '',
//       zone: '',
//       kebele: 'Ginjo Guduru',
//       city: 'Ginjo Guduru',
//       region: ''
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.familyNumber.trim()) errors.familyNumber = 'Family number is required';
//       if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
//       if (!values.headFirstName.trim()) errors.headFirstName = 'Head first name is required';
//       if (!values.headLastName.trim()) errors.headLastName = 'Head last name is required';
//       if (!values.headGender) errors.headGender = 'Head gender is required';
//       if (!values.headPhone.trim()) errors.headPhone = 'Head phone number is required';
//       if (!values.zone.trim()) errors.zone = 'Zone is required';
//       if (!values.region.trim()) errors.region = 'Region is required';
//       return errors;
//     },
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       try {
//         const formData = {
//           ...values,
//           members: familyMembers
//         };
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         console.log('Family form submitted:', formData);
//       } catch (error) {
//         console.error('Submission error:', error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   });

//   const addFamilyMember = () => {
//     const newMember = {
//       id: Date.now(),
//       name: '',
//       relationship: '',
//       idNumber: ''
//     };
//     setFamilyMembers([...familyMembers, newMember]);
//   };

//   const removeFamilyMember = (id) => {
//     if (familyMembers.length > 1) {
//       setFamilyMembers(familyMembers.filter(member => member.id !== id));
//     }
//   };

//   const updateFamilyMember = (id, field, value) => {
//     setFamilyMembers(familyMembers.map(member =>
//       member.id === id ? { ...member, [field]: value } : member
//     ));
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <Users className="w-8 h-8 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
//         <p className="text-gray-600">Fill in the information below to register a new family in the system</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Family Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
//               <Home className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
//               <p className="text-gray-600 text-sm">Basic family details</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Family Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="familyNumber"
//                 value={values.familyNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('familyNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.familyNumber ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter family number"
//               />
//               {errors.familyNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.familyNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 House Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="houseNumber"
//                 value={values.houseNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('houseNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.houseNumber ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter house number"
//               />
//               {errors.houseNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Family Head Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Head Information</h2>
//               <p className="text-gray-600 text-sm">Details about the family head</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headFirstName"
//                 value={values.headFirstName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headFirstName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headFirstName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter first name"
//               />
//               {errors.headFirstName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headFirstName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headLastName"
//                 value={values.headLastName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headLastName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headLastName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter last name"
//               />
//               {errors.headLastName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headLastName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Gender <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="headGender"
//                 value={values.headGender}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headGender')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headGender ? 'border-red-300' : 'border-gray-300'
//                   }`}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               {errors.headGender && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headGender}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 ID Number (if exists)
//               </label>
//               <input
//                 type="text"
//                 name="head_id"
//                 value={values.head_id}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 placeholder="Enter ID number"
//               />
//               <p className="mt-1 text-sm text-gray-500">
//                 Leave blank if the family head is not registered yet
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="tel"
//                   name="headPhone"
//                   value={values.headPhone}
//                   onChange={handleChange}
//                   onBlur={() => validateField('headPhone')}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.headPhone ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                   placeholder="+251 9XX XXX XXX"
//                 />
//               </div>
//               {errors.headPhone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headPhone}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Family Members Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Members</h2>
//               <p className="text-gray-600 text-sm">Add all family members</p>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Member Name</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Relationship</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID (if exists)</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {familyMembers.map((member, index) => (
//                   <tr key={member.id} className="border-b border-gray-100 last:border-b-0">
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="Member Name"
//                         readOnly={member.relationship === 'head'}
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       <select
//                         value={member.relationship}
//                         onChange={(e) => updateFamilyMember(member.id, 'relationship', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         disabled={member.relationship === 'head'}
//                       >
//                         <option value="head">Head</option>
//                         <option value="spouse">Spouse</option>
//                         <option value="child">Child</option>
//                         <option value="parent">Parent</option>
//                         <option value="sibling">Sibling</option>
//                         <option value="other">Other Relative</option>
//                       </select>
//                     </td>
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.idNumber}
//                         onChange={(e) => updateFamilyMember(member.id, 'idNumber', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="ID Number"
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       {member.relationship !== 'head' && (
//                         <button
//                           type="button"
//                           onClick={() => removeFamilyMember(member.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button
//             type="button"
//             onClick={addFamilyMember}
//             className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Another Member</span>
//           </button>
//         </div>

//         {/* Address Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-orange-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
//               <p className="text-gray-600 text-sm">Family residence location</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="zone"
//                 value={values.zone}
//                 onChange={handleChange}
//                 onBlur={() => validateField('zone')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.zone ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter zone"
//               />
//               {errors.zone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Kebele <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="kebele"
//                 value={values.kebele}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 readOnly
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City/Town <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={values.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 readOnly
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Region <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="region"
//                 value={values.region}
//                 onChange={handleChange}
//                 onBlur={() => validateField('region')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.region ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter region"
//               />
//               {errors.region && (
//                 <p className="mt-1 text-sm text-red-600">{errors.region}</p>
//               )}
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
//             disabled={isSubmitting}
//             className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Registering...</span>
//               </>
//             ) : (
//               <>
//                 <Users className="w-5 h-5" />
//                 <span>Register Family</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFamilyForm;

// import React, { useState } from 'react';
// import { useForm } from '../../hooks/useForm';
// import {
//   Users,
//   User,
//   Home,
//   Phone,
//   MapPin,
//   Plus,
//   Trash2,
//   AlertCircle
// } from 'lucide-react';

// const AddFamilyForm = ({ onFamilyAdded }) => {
//   const [familyMembers, setFamilyMembers] = useState([
//     { id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const { values, errors, handleChange, handleSubmit, validateField, resetForm } = useForm({
//     initialValues: {
//       houseNumber: '',
//       headFirstName: '',
//       headLastName: '',
//       headGender: '',
//       headPhone: '',
//       zone: '',
//       kebele: 'Ginjo Guduru',
//       city: 'Ginjo Guduru',
//       region: 'Oromia' // Default region
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
//       if (!values.headFirstName.trim()) errors.headFirstName = 'Head first name is required';
//       if (!values.headLastName.trim()) errors.headLastName = 'Head last name is required';
//       if (!values.headGender) errors.headGender = 'Head gender is required';
//       if (!values.headPhone.trim()) errors.headPhone = 'Head phone number is required';
//       if (!values.zone.trim()) errors.zone = 'Zone is required';

//       // Phone validation for Ethiopia format
//       const phoneRegex = /^(\+251|0)[79]\d{8}$/;
//       if (values.headPhone && !phoneRegex.test(values.headPhone.replace(/\s/g, ''))) {
//         errors.headPhone = 'Please enter a valid Ethiopian phone number (e.g., +2519XXXXXXXX or 09XXXXXXXX)';
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       setSubmitError('');
//       setSubmitSuccess(false);

//       try {
//         // Combine address fields - region is now default
//         const address = `${values.kebele}, ${values.city}, ${values.region}`.trim();

//         // Prepare family data for backend
//         const familyData = {
//           houseNumber: values.houseNumber.trim(),
//           zone: values.zone.trim(),
//           address: address,
//           // Send head details for backend to create individual first
//           headFirstName: values.headFirstName.trim(),
//           headLastName: values.headLastName.trim(),
//           headGender: values.headGender,
//           headPhone: values.headPhone.trim().replace(/\s/g, '')
//         };

//         console.log('Submitting family data:', familyData);

//         // Call backend API
//         const response = await fetch('http://localhost:5000/api/families', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(familyData)
//         });

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(result.message || 'Failed to register family');
//         }

//         console.log('Family created successfully:', result.data);

//         // Success
//         setSubmitSuccess(true);

//         // Reset form
//         resetForm();
//         setFamilyMembers([{ id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }]);

//         // Callback to refresh stats if provided
//         if (onFamilyAdded) {
//           onFamilyAdded();
//         }

//         // Auto-hide success message after 5 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false);
//         }, 5000);

//       } catch (error) {
//         console.error('Submission error:', error);
//         setSubmitError(error.message || 'An error occurred. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   });

//   const addFamilyMember = () => {
//     const newMember = {
//       id: Date.now(),
//       name: '',
//       relationship: 'child', // Default to child
//       idNumber: ''
//     };
//     setFamilyMembers([...familyMembers, newMember]);
//   };

//   const removeFamilyMember = (id) => {
//     if (familyMembers.length > 1) {
//       setFamilyMembers(familyMembers.filter(member => member.id !== id));
//     }
//   };

//   const updateFamilyMember = (id, field, value) => {
//     setFamilyMembers(familyMembers.map(member =>
//       member.id === id ? { ...member, [field]: value } : member
//     ));
//   };

//   // Format phone number as user types
//   const formatPhoneNumber = (value) => {
//     let phone = value.replace(/\D/g, '');

//     if (phone.startsWith('251')) {
//       phone = '+' + phone;
//     } else if (phone.startsWith('0')) {
//       phone = '+251' + phone.substring(1);
//     } else if (phone.length > 0 && !phone.startsWith('+')) {
//       phone = '+251' + phone;
//     }

//     // Format: +251 XXX XXX XXX
//     if (phone.length > 4) {
//       phone = phone.replace(/(\+251)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
//     }

//     return phone;
//   };

//   const handlePhoneChange = (e) => {
//     const formattedPhone = formatPhoneNumber(e.target.value);
//     handleChange({ target: { name: 'headPhone', value: formattedPhone } });
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <Users className="w-8 h-8 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
//         <p className="text-gray-600">Fill in the information below to register a new family in the system</p>
//       </div>

//       {/* Success Message */}
//       {submitSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//               <Users className="w-4 h-4 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-green-800">Family Registered Successfully!</h3>
//               <p className="text-sm text-green-700 mt-1">
//                 The family has been added to the database. You can now register another family.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
//               <AlertCircle className="w-4 h-4 text-red-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
//               <p className="text-sm text-red-700 mt-1">{submitError}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Family Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
//               <Home className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
//               <p className="text-gray-600 text-sm">Basic family details</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 House Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="houseNumber"
//                 value={values.houseNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('houseNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.houseNumber ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter house number (e.g., H001)"
//               />
//               {errors.houseNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="zone"
//                 value={values.zone}
//                 onChange={handleChange}
//                 onBlur={() => validateField('zone')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.zone ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter zone (e.g., Zone 1)"
//               />
//               {errors.zone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Family Head Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Head Information</h2>
//               <p className="text-gray-600 text-sm">Details about the family head</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headFirstName"
//                 value={values.headFirstName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headFirstName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headFirstName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter first name"
//               />
//               {errors.headFirstName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headFirstName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headLastName"
//                 value={values.headLastName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headLastName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headLastName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter last name"
//               />
//               {errors.headLastName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headLastName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Gender <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="headGender"
//                 value={values.headGender}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headGender')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headGender ? 'border-red-300' : 'border-gray-300'
//                   }`}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               {errors.headGender && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headGender}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="tel"
//                   name="headPhone"
//                   value={values.headPhone}
//                   onChange={handlePhoneChange}
//                   onBlur={() => validateField('headPhone')}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.headPhone ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                   placeholder="+251 9XX XXX XXX"
//                 />
//               </div>
//               {errors.headPhone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headPhone}</p>
//               )}
//               <p className="mt-1 text-xs text-gray-500">
//                 Format: +251 9XX XXX XXX or 09XX XXX XXX
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Family Members Card - OPTIONAL FOR NOW */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Members (Optional)</h2>
//               <p className="text-gray-600 text-sm">Add family members - you can do this later</p>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Member Name</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Relationship</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID (if exists)</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {familyMembers.map((member, index) => (
//                   <tr key={member.id} className="border-b border-gray-100 last:border-b-0">
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="Member Name"
//                         readOnly={member.relationship === 'head'}
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       <select
//                         value={member.relationship}
//                         onChange={(e) => updateFamilyMember(member.id, 'relationship', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         disabled={member.relationship === 'head'}
//                       >
//                         <option value="head">Head</option>
//                         <option value="spouse">Spouse</option>
//                         <option value="child">Child</option>
//                         <option value="parent">Parent</option>
//                         <option value="sibling">Sibling</option>
//                         <option value="other">Other Relative</option>
//                       </select>
//                     </td>
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.idNumber}
//                         onChange={(e) => updateFamilyMember(member.id, 'idNumber', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="ID Number"
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       {member.relationship !== 'head' && (
//                         <button
//                           type="button"
//                           onClick={() => removeFamilyMember(member.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button
//             type="button"
//             onClick={addFamilyMember}
//             className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Another Member</span>
//           </button>

//           <p className="mt-2 text-sm text-gray-500">
//             Note: You can add family members individually after creating the family.
//           </p>
//         </div>

//         {/* Address Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-orange-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
//               <p className="text-gray-600 text-sm">Family residence location</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Kebele
//               </label>
//               <input
//                 type="text"
//                 name="kebele"
//                 value={values.kebele}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City/Town
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={values.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Region
//               </label>
//               <input
//                 type="text"
//                 name="region"
//                 value={values.region}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 readOnly
//               />
//               <p className="mt-1 text-sm text-gray-500">Default region: Oromia</p>
//             </div>
//           </div>

//           <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//             <p className="text-sm text-blue-800">
//               <strong>Note:</strong> Address will be saved as: <code className="bg-blue-100 px-2 py-1 rounded">{values.kebele}, {values.city}, {values.region}</code>
//             </p>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             onClick={() => {
//               resetForm();
//               setFamilyMembers([{ id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }]);
//               setSubmitError('');
//             }}
//             className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
//             disabled={isSubmitting}
//           >
//             Clear Form
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Registering...</span>
//               </>
//             ) : (
//               <>
//                 <Users className="w-5 h-5" />
//                 <span>Register Family</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFamilyForm;



// import React, { useState } from 'react';
// import { useForm } from '../../hooks/useForm';
// import {
//   Users,
//   User,
//   Home,
//   Phone,
//   MapPin,
//   Plus,
//   Trash2,
//   AlertCircle
// } from 'lucide-react';

// const AddFamilyForm = ({ onFamilyAdded }) => {
//   const [familyMembers, setFamilyMembers] = useState([
//     { id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const { values, errors, handleChange, handleSubmit, validateField } = useForm({
//     initialValues: {
//       houseNumber: '',
//       headFirstName: '',
//       headLastName: '',
//       headGender: '',
//       headPhone: '',
//       zone: '',
//       kebele: 'Ginjo Guduru',
//       city: 'Ginjo Guduru',
//       region: 'Oromia'
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
//       if (!values.headFirstName.trim()) errors.headFirstName = 'Head first name is required';
//       if (!values.headLastName.trim()) errors.headLastName = 'Head last name is required';
//       if (!values.headGender) errors.headGender = 'Head gender is required';
//       if (!values.headPhone.trim()) errors.headPhone = 'Head phone number is required';
//       if (!values.zone.trim()) errors.zone = 'Zone is required';

//       // Phone validation for Ethiopia format
//       const phoneRegex = /^(\+251|0)[79]\d{8}$/;
//       if (values.headPhone && !phoneRegex.test(values.headPhone.replace(/\s/g, ''))) {
//         errors.headPhone = 'Please enter a valid Ethiopian phone number (e.g., +2519XXXXXXXX or 09XXXXXXXX)';
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       setSubmitError('');
//       setSubmitSuccess(false);

//       try {
//         // Combine address fields - region is now default
//         const address = `${values.kebele}, ${values.city}, ${values.region}`.trim();

//         // Prepare family data for backend
//         const familyData = {
//           houseNumber: values.houseNumber.trim(),
//           zone: values.zone.trim(),
//           address: address,
//           // Send head details for backend to create individual first
//           headFirstName: values.headFirstName.trim(),
//           headLastName: values.headLastName.trim(),
//           headGender: values.headGender,
//           headPhone: values.headPhone.trim().replace(/\s/g, '')
//         };

//         console.log('Submitting family data:', familyData);

//         // Call backend API
//         const response = await fetch('http://localhost:5000/api/families', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(familyData)
//         });

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(result.message || 'Failed to register family');
//         }

//         console.log('Family created successfully:', result.data);

//         // Success
//         setSubmitSuccess(true);

//         // Reset form manually since resetForm doesn't exist
//         // We'll use the initialValues to reset
//         Object.keys(values).forEach(key => {
//           handleChange({
//             target: {
//               name: key,
//               value: key === 'kebele' ? 'Ginjo Guduru' :
//                 key === 'city' ? 'Ginjo Guduru' :
//                   key === 'region' ? 'Oromia' : ''
//             }
//           });
//         });

//         setFamilyMembers([{ id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }]);

//         // Callback to refresh stats if provided
//         if (onFamilyAdded) {
//           onFamilyAdded();
//         }

//         // Auto-hide success message after 5 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false);
//         }, 5000);

//       } catch (error) {
//         console.error('Submission error:', error);
//         setSubmitError(error.message || 'An error occurred. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   });

//   const addFamilyMember = () => {
//     const newMember = {
//       id: Date.now(),
//       name: '',
//       relationship: 'child',
//       idNumber: ''
//     };
//     setFamilyMembers([...familyMembers, newMember]);
//   };

//   const removeFamilyMember = (id) => {
//     if (familyMembers.length > 1) {
//       setFamilyMembers(familyMembers.filter(member => member.id !== id));
//     }
//   };

//   const updateFamilyMember = (id, field, value) => {
//     setFamilyMembers(familyMembers.map(member =>
//       member.id === id ? { ...member, [field]: value } : member
//     ));
//   };

//   // Format phone number as user types
//   const formatPhoneNumber = (value) => {
//     let phone = value.replace(/\D/g, '');

//     if (phone.startsWith('251')) {
//       phone = '+' + phone;
//     } else if (phone.startsWith('0')) {
//       phone = '+251' + phone.substring(1);
//     } else if (phone.length > 0 && !phone.startsWith('+')) {
//       phone = '+251' + phone;
//     }

//     // Format: +251 XXX XXX XXX
//     if (phone.length > 4) {
//       phone = phone.replace(/(\+251)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
//     }

//     return phone;
//   };

//   const handlePhoneChange = (e) => {
//     const formattedPhone = formatPhoneNumber(e.target.value);
//     handleChange({ target: { name: 'headPhone', value: formattedPhone } });
//   };

//   // Manual form reset function
//   const resetForm = () => {
//     Object.keys(values).forEach(key => {
//       handleChange({
//         target: {
//           name: key,
//           value: key === 'kebele' ? 'Ginjo Guduru' :
//             key === 'city' ? 'Ginjo Guduru' :
//               key === 'region' ? 'Oromia' : ''
//         }
//       });
//     });
//     setFamilyMembers([{ id: 1, name: 'Family Head', relationship: 'head', idNumber: '' }]);
//     setSubmitError('');
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <Users className="w-8 h-8 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
//         <p className="text-gray-600">Fill in the information below to register a new family in the system</p>
//       </div>

//       {/* Success Message */}
//       {submitSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//               <Users className="w-4 h-4 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-green-800">Family Registered Successfully!</h3>
//               <p className="text-sm text-green-700 mt-1">
//                 The family has been added to the database. You can now register another family.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
//               <AlertCircle className="w-4 h-4 text-red-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
//               <p className="text-sm text-red-700 mt-1">{submitError}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Family Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
//               <Home className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
//               <p className="text-gray-600 text-sm">Basic family details</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 House Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="houseNumber"
//                 value={values.houseNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('houseNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.houseNumber ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter house number (e.g., H001)"
//               />
//               {errors.houseNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="zone"
//                 value={values.zone}
//                 onChange={handleChange}
//                 onBlur={() => validateField('zone')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.zone ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter zone (e.g., Zone 1)"
//               />
//               {errors.zone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Family Head Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Head Information</h2>
//               <p className="text-gray-600 text-sm">Details about the family head</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headFirstName"
//                 value={values.headFirstName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headFirstName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headFirstName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter first name"
//               />
//               {errors.headFirstName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headFirstName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="headLastName"
//                 value={values.headLastName}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headLastName')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headLastName ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter last name"
//               />
//               {errors.headLastName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headLastName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Gender <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="headGender"
//                 value={values.headGender}
//                 onChange={handleChange}
//                 onBlur={() => validateField('headGender')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.headGender ? 'border-red-300' : 'border-gray-300'
//                   }`}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               {errors.headGender && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headGender}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="tel"
//                   name="headPhone"
//                   value={values.headPhone}
//                   onChange={handlePhoneChange}
//                   onBlur={() => validateField('headPhone')}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.headPhone ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                   placeholder="+251 9XX XXX XXX"
//                 />
//               </div>
//               {errors.headPhone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.headPhone}</p>
//               )}
//               <p className="mt-1 text-xs text-gray-500">
//                 Format: +251 9XX XXX XXX or 09XX XXX XXX
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Family Members Card - OPTIONAL FOR NOW */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Members (Optional)</h2>
//               <p className="text-gray-600 text-sm">Add family members - you can do this later</p>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Member Name</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Relationship</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID (if exists)</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {familyMembers.map((member, index) => (
//                   <tr key={member.id} className="border-b border-gray-100 last:border-b-0">
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="Member Name"
//                         readOnly={member.relationship === 'head'}
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       <select
//                         value={member.relationship}
//                         onChange={(e) => updateFamilyMember(member.id, 'relationship', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         disabled={member.relationship === 'head'}
//                       >
//                         <option value="head">Head</option>
//                         <option value="spouse">Spouse</option>
//                         <option value="child">Child</option>
//                         <option value="parent">Parent</option>
//                         <option value="sibling">Sibling</option>
//                         <option value="other">Other Relative</option>
//                       </select>
//                     </td>
//                     <td className="py-3 px-4">
//                       <input
//                         type="text"
//                         value={member.idNumber}
//                         onChange={(e) => updateFamilyMember(member.id, 'idNumber', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//                         placeholder="ID Number"
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       {member.relationship !== 'head' && (
//                         <button
//                           type="button"
//                           onClick={() => removeFamilyMember(member.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button
//             type="button"
//             onClick={addFamilyMember}
//             className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Another Member</span>
//           </button>

//           <p className="mt-2 text-sm text-gray-500">
//             Note: You can add family members individually after creating the family.
//           </p>
//         </div>

//         {/* Address Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-orange-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
//               <p className="text-gray-600 text-sm">Family residence location</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Kebele
//               </label>
//               <input
//                 type="text"
//                 name="kebele"
//                 value={values.kebele}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City/Town
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={values.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Region
//               </label>
//               <input
//                 type="text"
//                 name="region"
//                 value={values.region}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 readOnly
//               />
//               <p className="mt-1 text-sm text-gray-500">Default region: Oromia</p>
//             </div>
//           </div>

//           <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//             <p className="text-sm text-blue-800">
//               <strong>Note:</strong> Address will be saved as: <code className="bg-blue-100 px-2 py-1 rounded">{values.kebele}, {values.city}, {values.region}</code>
//             </p>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
//             disabled={isSubmitting}
//           >
//             Clear Form
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Registering...</span>
//               </>
//             ) : (
//               <>
//                 <Users className="w-5 h-5" />
//                 <span>Register Family</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFamilyForm;

// import React, { useState, useEffect } from 'react';
// import { useForm } from '../../hooks/useForm';
// import {
//   Users,
//   User,
//   Home,
//   Phone,
//   MapPin,
//   Search,
//   AlertCircle,
//   ChevronDown,
//   X
// } from 'lucide-react';

// const AddFamilyForm = ({ onFamilyAdded }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Head search states
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedHead, setSelectedHead] = useState(null);

//   const { values, errors, handleChange, handleSubmit, validateField } = useForm({
//     initialValues: {
//       houseNumber: '',
//       zone: '',
//       kebele: 'Ginjo Guduru',
//       city: 'Ginjo Guduru',
//       region: 'Oromia'
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.houseNumber.trim()) errors.houseNumber = 'House number is required';
//       if (!values.zone.trim()) errors.zone = 'Zone is required';
//       if (!selectedHead) errors.head = 'Please select a family head';
//       return errors;
//     },
//     onSubmit: async (values) => {
//       if (!selectedHead) {
//         setSubmitError('Please select a family head');
//         return;
//       }

//       setIsSubmitting(true);
//       setSubmitError('');
//       setSubmitSuccess(false);

//       try {
//         // Combine address fields
//         const address = `${values.kebele}, ${values.city}, ${values.region}`.trim();

//         // Prepare family data for backend
//         const familyData = {
//           houseNumber: values.houseNumber.trim(),
//           zone: values.zone.trim(),
//           address: address,
//           head_id: selectedHead.id  // Send only head_id
//         };

//         console.log('Submitting family data:', familyData);

//         // Call backend API
//         const response = await fetch('http://localhost:5000/api/families', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(familyData)
//         });

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(result.message || 'Failed to register family');
//         }

//         console.log('Family created successfully:', result.data);

//         // Success
//         setSubmitSuccess(true);

//         // Reset form
//         handleChange({ target: { name: 'houseNumber', value: '' } });
//         handleChange({ target: { name: 'zone', value: '' } });
//         setSelectedHead(null);
//         setSearchQuery('');
//         setSearchResults([]);

//         // Callback to refresh stats if provided
//         if (onFamilyAdded) {
//           onFamilyAdded();
//         }

//         // Auto-hide success message after 5 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false);
//         }, 5000);

//       } catch (error) {
//         console.error('Submission error:', error);
//         setSubmitError(error.message || 'An error occurred. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   });

//   // Search for available individuals
//   const searchIndividuals = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/families/available-individuals?q=${encodeURIComponent(query)}`
//       );
//       const result = await response.json();

//       if (result.success) {
//         setSearchResults(result.data);
//       } else {
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length >= 2) {
//       searchIndividuals(query);
//       setShowDropdown(true);
//     } else {
//       setSearchResults([]);
//       setShowDropdown(false);
//     }
//   };

//   // Select an individual as head
//   const handleSelectHead = (individual) => {
//     setSelectedHead(individual);
//     setSearchQuery(`${individual.first_name} ${individual.last_name} (${individual.phone})`);
//     setShowDropdown(false);
//     setSearchResults([]);
//   };

//   // Clear selected head
//   const handleClearHead = () => {
//     setSelectedHead(null);
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   // Manual form reset
//   const resetForm = () => {
//     handleChange({ target: { name: 'houseNumber', value: '' } });
//     handleChange({ target: { name: 'zone', value: '' } });
//     setSelectedHead(null);
//     setSearchQuery('');
//     setSearchResults([]);
//     setSubmitError('');
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <Users className="w-8 h-8 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
//         <p className="text-gray-600">Select an existing individual as head and provide family details</p>
//       </div>

//       {/* Success Message */}
//       {submitSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//               <Users className="w-4 h-4 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-green-800">Family Registered Successfully!</h3>
//               <p className="text-sm text-green-700 mt-1">
//                 The family has been created. You can now add family members.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {submitError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
//               <AlertCircle className="w-4 h-4 text-red-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
//               <p className="text-sm text-red-700 mt-1">{submitError}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Family Head Selection Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Select Family Head</h2>
//               <p className="text-gray-600 text-sm">Choose an existing individual as family head</p>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Individual <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                   placeholder="Search by name or phone number..."
//                 />
//                 {searchQuery && (
//                   <button
//                     type="button"
//                     onClick={handleClearHead}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}

//                 {/* Search Results Dropdown */}
//                 {showDropdown && searchResults.length > 0 && (
//                   <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
//                     {isSearching ? (
//                       <div className="p-4 text-center text-gray-500">
//                         <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                         <p className="text-sm">Searching...</p>
//                       </div>
//                     ) : (
//                       searchResults.map((individual) => (
//                         <button
//                           key={individual.id}
//                           type="button"
//                           onClick={() => handleSelectHead(individual)}
//                           className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                               {individual.first_name?.[0]}{individual.last_name?.[0]}
//                             </div>
//                             <div className="flex-1">
//                               <div className="font-medium text-gray-900">
//                                 {individual.first_name} {individual.last_name}
//                               </div>
//                               <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
//                                 <Phone className="w-3 h-3" />
//                                 <span>{individual.phone}</span>
//                                 {individual.gender && (
//                                   <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
//                                     {individual.gender}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </button>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>

//               {errors.head && !selectedHead && (
//                 <p className="mt-1 text-sm text-red-600">{errors.head}</p>
//               )}

//               <p className="mt-2 text-sm text-gray-500">
//                 Search for individuals who are not currently in any family
//               </p>
//             </div>

//             {/* Selected Head Display */}
//             {selectedHead && (
//               <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
//                       <User className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         {selectedHead.first_name} {selectedHead.last_name}
//                       </h3>
//                       <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                         <div className="flex items-center space-x-1">
//                           <Phone className="w-3 h-3" />
//                           <span>{selectedHead.phone}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
//                             {selectedHead.gender || 'Not specified'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={handleClearHead}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="mt-3 pt-3 border-t border-green-200">
//                   <div className="flex items-center space-x-2 text-sm text-green-700">
//                     <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
//                       <ChevronDown className="w-3 h-3" />
//                     </div>
//                     <span>This individual will be set as the family head</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Family Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
//               <Home className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
//               <p className="text-gray-600 text-sm">Basic family details</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 House Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="houseNumber"
//                 value={values.houseNumber}
//                 onChange={handleChange}
//                 onBlur={() => validateField('houseNumber')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.houseNumber ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter house number (e.g., H001)"
//               />
//               {errors.houseNumber && (
//                 <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Zone <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="zone"
//                 value={values.zone}
//                 onChange={handleChange}
//                 onBlur={() => validateField('zone')}
//                 className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.zone ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 placeholder="Enter zone (e.g., Zone 1)"
//               />
//               {errors.zone && (
//                 <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Address Information Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-orange-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
//               <p className="text-gray-600 text-sm">Family residence location</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Kebele
//               </label>
//               <input
//                 type="text"
//                 name="kebele"
//                 value={values.kebele}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City/Town
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={values.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//               />
//               <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Region
//               </label>
//               <input
//                 type="text"
//                 name="region"
//                 value={values.region}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
//                 readOnly
//               />
//               <p className="mt-1 text-sm text-gray-500">Default region: Oromia</p>
//             </div>
//           </div>

//           <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//             <p className="text-sm text-blue-800">
//               <strong>Note:</strong> Address will be saved as: <code className="bg-blue-100 px-2 py-1 rounded">{values.kebele}, {values.city}, {values.region}</code>
//             </p>
//           </div>
//         </div>

//         {/* Note about adding members */}
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <div className="flex items-start space-x-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//               <Users className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-blue-900">Add Family Members</h3>
//               <p className="text-blue-800 mt-2">
//                 Family members can be added after creating the family. Once this family is registered,
//                 you can go to the family details page and add members individually.
//               </p>
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                 <div className="bg-white p-3 rounded-lg border border-blue-100">
//                   <div className="font-medium text-blue-900">Step 1</div>
//                   <div className="text-blue-700 mt-1">Create family with head</div>
//                 </div>
//                 <div className="bg-white p-3 rounded-lg border border-blue-100">
//                   <div className="font-medium text-blue-900">Step 2</div>
//                   <div className="text-blue-700 mt-1">Go to family list</div>
//                 </div>
//                 <div className="bg-white p-3 rounded-lg border border-blue-100">
//                   <div className="font-medium text-blue-900">Step 3</div>
//                   <div className="text-blue-700 mt-1">Add members to family</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
//             disabled={isSubmitting}
//           >
//             Clear Form
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting || !selectedHead}
//             className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Registering...</span>
//               </>
//             ) : (
//               <>
//                 <Users className="w-5 h-5" />
//                 <span>Register Family</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFamilyForm;




import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import {
  Users,
  User,
  Home,
  Phone,
  MapPin,
  Search,
  AlertCircle,
  ChevronDown,
  X,
  Hash,
  UserCheck,
  UserX
} from 'lucide-react';

const AddFamilyForm = ({ onFamilyAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Head search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedHead, setSelectedHead] = useState(null);
  const [searchDebug, setSearchDebug] = useState('');

  const { values, errors, handleChange, handleSubmit, validateField, reset } = useForm({
    initialValues: {
      zone: '',
      kebele: 'Ginjo Guduru',
      city: 'Ginjo Guduru',
      region: 'Oromia'
    },
    validate: (values) => {
      const errors = {};
      if (!values.zone.trim()) errors.zone = 'Zone is required';
      if (!selectedHead) errors.head = 'Please select a family head';

      // Validate head has house number
      if (selectedHead && !selectedHead.house_number && !selectedHead.houseNumber) {
        errors.head = 'Selected individual must have a house number';
      }

      return errors;
    },
    // onSubmit: async (values) => {
    //   if (!selectedHead) {
    //     setSubmitError('Please select a family head');
    //     return;
    //   }

    //   // Check if head has house number
    //   if (!selectedHead.house_number && !selectedHead.houseNumber) {
    //     setSubmitError('Selected individual must have a house number');
    //     return;
    //   }

    //   setIsSubmitting(true);
    //   setSubmitError('');
    //   setSubmitSuccess(false);

    //   try {
    //     // Combine address fields
    //     const address = `${values.kebele}, ${values.city}, ${values.region}`.trim();

    //     // Get house number from selected head
    //     const houseNumber = selectedHead.house_number || selectedHead.houseNumber;

    //     // Prepare family data for backend
    //     const familyData = {
    //       houseNumber: houseNumber.trim(),
    //       zone: values.zone.trim(),
    //       address: address,
    //       head_id: selectedHead.id
    //     };

    //     console.log('Submitting family data:', familyData);

    //     // Call backend API
    //     const response = await fetch('http://localhost:5000/api/families', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(familyData)
    //     });

    //     const result = await response.json();

    //     if (!response.ok || !result.success) {
    //       throw new Error(result.message || 'Failed to register family');
    //     }

    //     console.log('Family created successfully:', result.data);

    //     // Success
    //     setSubmitSuccess(true);

    //     // Reset form
    //     handleChange({ target: { name: 'zone', value: '' } });
    //     setSelectedHead(null);
    //     setSearchQuery('');
    //     setSearchResults([]);
    //     setSearchDebug('');

    //     // Callback to refresh stats if provided
    //     if (onFamilyAdded) {
    //       onFamilyAdded();
    //     }

    //     // Auto-hide success message after 5 seconds
    //     setTimeout(() => {
    //       setSubmitSuccess(false);
    //     }, 5000);

    //   } catch (error) {
    //     console.error('Submission error:', error);
    //     setSubmitError(error.message || 'An error occurred. Please try again.');
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // }

    onSubmit: async (values) => {
      if (!selectedHead) {
        setSubmitError('Please select a family head');
        return;
      }

      // Check if head has house number
      if (!selectedHead.house_number && !selectedHead.houseNumber) {
        setSubmitError('Selected individual must have a house number');
        return;
      }

      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);

      try {
        // Combine address fields
        const address = `${values.kebele}, ${values.city}, ${values.region}`.trim();

        // Get house number from selected head
        const houseNumber = selectedHead.house_number || selectedHead.houseNumber;

        // Prepare family data for backend - INCLUDE ALL HEAD DETAILS
        const familyData = {
          houseNumber: houseNumber.trim(),
          zone: values.zone.trim(),
          address: address,
          head_id: selectedHead.id,
          // ALSO send head details for backward compatibility
          headFirstName: selectedHead.first_name,
          headLastName: selectedHead.last_name,
          headGender: selectedHead.gender,
          headPhone: selectedHead.phone
        };

        console.log('Submitting family data:', familyData);

        // Call backend API
        const response = await fetch('http://localhost:5000/api/families', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(familyData)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to register family');
        }

        console.log('Family created successfully:', result.data);

        // Success
        setSubmitSuccess(true);

        // Reset form
        // handleChange({ target: { name: 'zone', value: '' } });
        reset();
        setSelectedHead(null);
        setSearchQuery('');
        setSearchResults([]);
        setSearchDebug('');

        // Callback to refresh stats if provided
        if (onFamilyAdded) {
          onFamilyAdded();
        }

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);

      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError(error.message || 'An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  // Search for individuals
  const searchIndividuals = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchDebug('');
      return;
    }

    setIsSearching(true);
    setSearchDebug(`Searching for: "${query}"...`);

    try {
      console.log(`Calling API with query: "${query}"`);

      const response = await fetch(
        `http://localhost:5000/api/families/available-individuals?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );

      console.log('Response status:', response.status);

      const result = await response.json();

      console.log('API Response:', result);

      if (result.success) {
        setSearchResults(result.data || []);

        // Update debug info
        if (result.debug) {
          setSearchDebug(
            `Found ${result.debug.total_found} individuals, ` +
            `${result.debug.available} available (not in any family)`
          );
        } else {
          setSearchDebug(`Found ${result.data?.length || 0} available individuals`);
        }

        if (result.data && result.data.length === 0) {
          setSearchDebug(prev => prev + '. No available individuals found.');
        }
      } else {
        setSearchResults([]);
        setSearchDebug(`Error: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setSearchDebug(`Network error: ${error.message}`);

      // For testing only - remove in production
      if (process.env.NODE_ENV === 'development') {
        setSearchDebug('Using mock data for testing');
        setSearchResults([
          {
            id: 1,
            first_name: 'Test',
            last_name: 'User',
            phone: '+251911223344',
            gender: 'male',
            house_number: 'H-101',
            age: 30
          },
          {
            id: 2,
            first_name: 'Sample',
            last_name: 'Person',
            phone: '+251922334455',
            gender: 'female',
            house_number: 'H-102',
            age: 25
          }
        ]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      const debounceTimeout = setTimeout(() => {
        searchIndividuals(query);
        setShowDropdown(true);
      }, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setSearchResults([]);
      setSearchDebug('');
      setShowDropdown(false);
    }
  };

  // Select an individual as head
  const handleSelectHead = (individual) => {
    setSelectedHead(individual);
    setSearchQuery(
      `${individual.first_name} ${individual.last_name} ` +
      `(${individual.phone}) - ` +
      `House: ${individual.house_number || individual.houseNumber || 'No house number'}`
    );
    setShowDropdown(false);
    setSearchResults([]);
    setSearchDebug('');
  };

  // Clear selected head
  const handleClearHead = () => {
    setSelectedHead(null);
    setSearchQuery('');
    setSearchResults([]);
    setSearchDebug('');
  };

  // Manual form reset
  const resetForm = () => {
    handleChange({ target: { name: 'zone', value: '' } });
    setSelectedHead(null);
    setSearchQuery('');
    setSearchResults([]);
    setSearchDebug('');
    setSubmitError('');
  };

  // Format individual display name
  const getDisplayName = (individual) => {
    return `${individual.first_name} ${individual.last_name}`;
  };

  // Check if individual has house number
  const hasHouseNumber = (individual) => {
    return !!(individual.house_number || individual.houseNumber);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Family</h1>
        <p className="text-gray-600">Select an individual as head. Their house number will be used for the family.</p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-800">Family Registered Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                Family created with house number: <strong>{selectedHead?.house_number || selectedHead?.houseNumber}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
              <p className="text-sm text-red-700 mt-1">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Family Head Selection Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Select Family Head</h2>
              <p className="text-gray-600 text-sm">Search by name, phone, or house number</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Individual <span className="text-red-500">*</span>
              </label>

              {/* Debug Info */}
              {searchDebug && (
                <div className="mb-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  {searchDebug}
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Type at least 2 characters (name, phone, or house number)..."
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearHead}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Search Results Dropdown */}
                {showDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-6 text-center">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm text-gray-600">Searching...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <p className="text-xs font-medium text-gray-700">
                            Found {searchResults.length} individual{searchResults.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        {searchResults.map((individual) => (
                          <button
                            key={individual.id}
                            type="button"
                            onClick={() => handleSelectHead(individual)}
                            className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${!hasHouseNumber(individual) ? 'opacity-60' : ''}`}
                            disabled={!hasHouseNumber(individual)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${hasHouseNumber(individual) ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-400'}`}>
                                {individual.first_name?.[0]}{individual.last_name?.[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-gray-900 truncate">
                                      {getDisplayName(individual)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                                      <div className="flex items-center space-x-2">
                                        <Phone className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{individual.phone}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Hash className="w-3 h-3 flex-shrink-0" />
                                        <span className={`font-medium ${hasHouseNumber(individual) ? 'text-gray-900' : 'text-red-600'}`}>
                                          {individual.house_number || individual.houseNumber || 'No house number'}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2 flex-wrap">
                                        {individual.gender && (
                                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
                                            {individual.gender}
                                          </span>
                                        )}
                                        {individual.age && (
                                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                            Age: {individual.age}
                                          </span>
                                        )}
                                        {!hasHouseNumber(individual) && (
                                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                                            No house number
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0 ml-2">
                                    {hasHouseNumber(individual) ? (
                                      <UserCheck className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <UserX className="w-4 h-4 text-red-600" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </>
                    ) : searchQuery.length >= 2 ? (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserX className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">No individuals found</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Try a different search term or check if individuals have house numbers
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {errors.head && !selectedHead && (
                <p className="mt-1 text-sm text-red-600">{errors.head}</p>
              )}

              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> Search by:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Full name</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Phone number</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">House number</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Only individuals not currently in a family will be shown
                </p>
              </div>
            </div>

            {/* Selected Head Display */}
            {selectedHead && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getDisplayName(selectedHead)}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 mt-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{selectedHead.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Home className="w-3 h-3" />
                            <span className="font-medium">
                              House: {selectedHead.house_number || selectedHead.houseNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedHead.gender && (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                              {selectedHead.gender}
                            </span>
                          )}
                          {selectedHead.age && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              Age: {selectedHead.age}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearHead}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <ChevronDown className="w-3 h-3" />
                    </div>
                    <span>
                      Selected as family head. Family will use house number: <strong>{selectedHead.house_number || selectedHead.houseNumber}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Family Information Card - SIMPLIFIED */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Family Location</h2>
              <p className="text-gray-600 text-sm">Zone and address information</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Auto-filled House Number Display */}
            {selectedHead && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Family House Number</p>
                    <p className="text-lg font-bold text-blue-800">
                      {selectedHead.house_number || selectedHead.houseNumber}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Automatically set from selected head individual
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 ${errors.zone ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter zone (e.g., Zone 1)"
              />
              {errors.zone && (
                <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
              )}
            </div>
          </div>
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
                Kebele
              </label>
              <input
                type="text"
                name="kebele"
                value={values.kebele}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
              <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Town
              </label>
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
              <p className="mt-1 text-sm text-gray-500">Default: Ginjo Guduru</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <input
                type="text"
                name="region"
                value={values.region}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                readOnly
              />
              <p className="mt-1 text-sm text-gray-500">Default region: Oromia</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Address will be saved as: <code className="bg-blue-100 px-2 py-1 rounded">{values.kebele}, {values.city}, {values.region}</code>
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            disabled={isSubmitting}
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !selectedHead || (!selectedHead.house_number && !selectedHead.houseNumber)}
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