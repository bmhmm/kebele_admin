// import React from 'react';
// import { Users, ArrowLeft } from 'lucide-react';
// import AddFamilyForm from '../components/forms/AddFamilyForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const AddFamily = () => {
//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handleBack}
//           startIcon={<ArrowLeft className="w-4 h-4" />}
//         >
//           Back
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold text-orange-100">Register Family</h1>
//           <p className="text-blue-100">Add a new family to the kebele system</p>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <Users className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Total Families</p>
//                 <p className="text-xl font-bold text-gray-900">342</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <Users className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Avg. Members</p>
//                 <p className="text-xl font-bold text-gray-900">3.6</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <Users className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 <p className="text-xl font-bold text-gray-900">15</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Family Registration</CardTitle>
//           <CardDescription>
//             Register a new family with all members. The family head information is required.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddFamilyForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddFamily;




// import React, { useState, useEffect } from 'react';
// import { Users, ArrowLeft, Home, MapPin, Search, User, Loader } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

// const AddFamily = () => {
//   const [stats, setStats] = useState({ total: 0, avgMembers: 0, thisMonth: 0 });
//   const [loading, setLoading] = useState(true);
//   const [statsError, setStatsError] = useState(null);

//   const [formData, setFormData] = useState({
//     houseNumber: '',
//     zone: '',
//     address: '',
//     head_id: ''
//   });

//   const [headSearchTerm, setHeadSearchTerm] = useState('');
//   const [availableHeads, setAvailableHeads] = useState([]);
//   const [selectedHead, setSelectedHead] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Fetch real stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/families/stats');

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log('Stats API response:', result);

//         if (result.success && result.data) {
//           const avgMembers = parseFloat(result.data.avgMembers) || 0;

//           setStats({
//             total: parseInt(result.data.total) || 0,
//             avgMembers: avgMembers,
//             thisMonth: parseInt(result.data.thisMonth) || 0
//           });
//         } else {
//           throw new Error(result.message || 'Invalid response format');
//         }
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//         setStatsError(err.message);
//         setStats({ total: 0, avgMembers: 0, thisMonth: 0 });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Search for heads
//   useEffect(() => {
//     if (headSearchTerm.length > 2) {
//       const timer = setTimeout(() => {
//         searchHeads(headSearchTerm);
//       }, 500);
//       return () => clearTimeout(timer);
//     } else {
//       setAvailableHeads([]);
//     }
//   }, [headSearchTerm]);

//   const searchHeads = async (searchTerm) => {
//     try {
//       setSearching(true);
//       const response = await fetch(
//         `http://localhost:5000/api/families/available-individuals?q=${encodeURIComponent(searchTerm)}`
//       );
//       if (!response.ok) throw new Error('Failed to search');
//       const result = await response.json();
//       if (result.success) {
//         setAvailableHeads(result.data);
//       } else {
//         setAvailableHeads([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setAvailableHeads([]);
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleHeadSelect = (head) => {
//     setSelectedHead(head);
//     setFormData(prev => ({ ...prev, head_id: head.id }));
//     setHeadSearchTerm(`${head.first_name} ${head.last_name}`);
//     setAvailableHeads([]);
//     setErrors(prev => ({ ...prev, head_id: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.houseNumber.trim()) {
//       newErrors.houseNumber = 'House number is required';
//     } else if (!/^[A-Za-z0-9\-]+$/.test(formData.houseNumber)) {
//       newErrors.houseNumber = 'Invalid house number format';
//     }

//     if (!formData.zone) {
//       newErrors.zone = 'Zone is required';
//     }

//     if (!formData.head_id) {
//       newErrors.head_id = 'Please select a family head';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const response = await fetch('http://localhost:5000/api/families', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to register family');
//       }

//       setSubmitSuccess(true);

//       // Reset form
//       setFormData({
//         houseNumber: '',
//         zone: '',
//         address: '',
//         head_id: ''
//       });
//       setSelectedHead(null);
//       setHeadSearchTerm('');
//       setAvailableHeads([]);

//       // Refresh stats after successful submission
//       const statsResponse = await fetch('http://localhost:5000/api/families/stats');
//       if (statsResponse.ok) {
//         const statsData = await statsResponse.json();
//         if (statsData.success && statsData.data) {
//           const avgMembers = parseFloat(statsData.data.avgMembers) || 0;
//           setStats({
//             total: parseInt(statsData.data.total) || 0,
//             avgMembers: avgMembers,
//             thisMonth: parseInt(statsData.data.thisMonth) || 0
//           });
//         }
//       }

//       // Auto-hide success message after 5 seconds
//       setTimeout(() => {
//         setSubmitSuccess(false);
//       }, 5000);

//     } catch (error) {
//       console.error('Submission error:', error);
//       setErrors(prev => ({ ...prev, submit: error.message }));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const clearForm = () => {
//     setFormData({
//       houseNumber: '',
//       zone: '',
//       address: '',
//       head_id: ''
//     });
//     setSelectedHead(null);
//     setHeadSearchTerm('');
//     setAvailableHeads([]);
//     setErrors({});
//     setSubmitSuccess(false);
//   };

//   const formatAvgMembers = (value) => {
//     const num = parseFloat(value);
//     if (isNaN(num)) return '0.0';
//     return num.toFixed(1);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Success Message */}
//       {submitSuccess && (
//         <div className="bg-white rounded-xl shadow-sm border border-green-200 p-4">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-green-800">
//                 Family registered successfully!
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back</span>
//         </button>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Register Family</h1>
//           <p className="text-gray-600">Add a new family to the kebele system</p>
//         </div>
//       </div>

//       {/* Stats Overview - Cards with white background */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
//               <Users className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Total Families</p>
//               {loading ? (
//                 <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
//               ) : statsError ? (
//                 <p className="text-sm text-red-600 mt-1">Error</p>
//               ) : (
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Avg. Members</p>
//               {loading ? (
//                 <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
//               ) : statsError ? (
//                 <p className="text-sm text-red-600 mt-1">Error</p>
//               ) : (
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {formatAvgMembers(stats.avgMembers)}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
//               <Users className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">This Month</p>
//               {loading ? (
//                 <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
//               ) : statsError ? (
//                 <p className="text-sm text-red-600 mt-1">Error</p>
//               ) : (
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stats.thisMonth}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error Message for Stats */}
//       {statsError && (
//         <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4">
//           <p className="text-red-800 text-sm">
//             <strong>Error loading statistics:</strong> {statsError}
//           </p>
//         </div>
//       )}

//       {/* Form Section - Main Card with white background */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Family Registration</h2>
//             <p className="text-gray-600 mt-1">
//               Register a new family. Search and select an existing individual as family head.
//             </p>
//           </div>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* House Information - Light gray background section */}
//             <div className="bg-gray-50 rounded-2xl p-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                   <Home className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">House Information</h2>
//                   <p className="text-gray-600 text-sm">Enter the family's residence details</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* House Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     House Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="houseNumber"
//                     value={formData.houseNumber}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.houseNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     placeholder="H-001"
//                     disabled={submitting}
//                   />
//                   {errors.houseNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
//                   )}
//                 </div>

//                 {/* Zone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Zone <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="zone"
//                     value={formData.zone}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.zone ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     disabled={submitting}
//                   >
//                     <option value="">Select Zone</option>
//                     <option value="Zone 1">Zone 1</option>
//                     <option value="Zone 2">Zone 2</option>
//                     <option value="Zone 3">Zone 3</option>
//                     <option value="Zone 4">Zone 4</option>
//                     <option value="Zone 5">Zone 5</option>
//                   </select>
//                   {errors.zone && (
//                     <p className="mt-1 text-sm text-red-600">{errors.zone}</p>
//                   )}
//                 </div>

//                 {/* Address */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address (Optional)
//                   </label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       rows="3"
//                       className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Enter full address"
//                       disabled={submitting}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Family Head Selection - Light gray background section */}
//             <div className="bg-gray-50 rounded-2xl p-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
//                   <User className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Family Head</h2>
//                   <p className="text-gray-600 text-sm">Select head from existing individuals</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {/* Head Search */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Search for Head <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       value={headSearchTerm}
//                       onChange={(e) => setHeadSearchTerm(e.target.value)}
//                       placeholder="Type name or phone..."
//                       className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.head_id ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       disabled={submitting}
//                     />
//                     {searching && (
//                       <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
//                     )}
//                   </div>
//                   {errors.head_id && (
//                     <p className="mt-1 text-sm text-red-600">{errors.head_id}</p>
//                   )}
//                 </div>

//                 {/* Search Results - White background card */}
//                 {availableHeads.length > 0 && (
//                   <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
//                     <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                       <p className="text-sm font-medium text-gray-700">Available Heads:</p>
//                     </div>
//                     <div className="max-h-60 overflow-y-auto">
//                       {availableHeads.map((head) => (
//                         <button
//                           key={head.id}
//                           type="button"
//                           onClick={() => handleHeadSelect(head)}
//                           className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
//                           disabled={submitting}
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                               <span className="text-blue-700 font-semibold">
//                                 {head.first_name?.charAt(0)}{head.last_name?.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="font-medium text-gray-900">
//                                 {head.first_name} {head.last_name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {head.phone} • {head.age} years
//                               </div>
//                             </div>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Selected Head Display - White background card */}
//                 {selectedHead && (
//                   <div className="bg-white border border-green-200 rounded-xl p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                           <User className="w-6 h-6 text-green-600" />
//                         </div>
//                         <div>
//                           <div className="font-semibold text-gray-900">
//                             {selectedHead.first_name} {selectedHead.last_name}
//                           </div>
//                           <div className="text-sm text-gray-600">
//                             Selected as Family Head
//                           </div>
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedHead(null);
//                           setFormData(prev => ({ ...prev, head_id: '' }));
//                           setHeadSearchTerm('');
//                         }}
//                         className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
//                         disabled={submitting}
//                       >
//                         Change
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructions - White background card */}
//                 <div className="bg-white border border-blue-200 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="flex-shrink-0">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-blue-800">
//                         <strong>Note:</strong> The family head must be an existing individual in the system.
//                         Start typing a name or phone number to search.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Error - White background card */}
//             {errors.submit && (
//               <div className="bg-white border border-red-200 rounded-xl p-4">
//                 <p className="text-red-800 text-sm">
//                   <strong>Error:</strong> {errors.submit}
//                 </p>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={clearForm}
//                 disabled={submitting}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
//               >
//                 Clear Form
//               </button>
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader className="w-4 h-4 animate-spin" />
//                     <span>Registering...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Users className="w-4 h-4" />
//                     <span>Register Family</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFamily;



import React, { useState, useEffect } from 'react';
import { Users, ArrowLeft, RefreshCw } from 'lucide-react';
import AddFamilyForm from '../components/forms/AddFamilyForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddFamily = () => {
  const [stats, setStats] = useState({
    total: 0,
    avgMembers: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    window.history.back();
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/families/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch family statistics');
      }

      const result = await response.json();

      if (result.success) {
        // Safely parse the data
        const total = parseInt(result.data.total) || 0;
        const avgMembers = parseFloat(result.data.avgMembers) || 0;
        const thisMonth = parseInt(result.data.thisMonth) || 0;

        setStats({
          total,
          avgMembers,
          thisMonth
        });
      } else {
        throw new Error(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching family stats:', err);
      setError(err.message);
      // Set default values if API fails
      setStats({
        total: 0,
        avgMembers: 0,
        thisMonth: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format average members to 1 decimal place
  const formatAvgMembers = (avg) => {
    const num = parseFloat(avg);
    return isNaN(num) ? '0.0' : num.toFixed(1);
  };

  // Format numbers with commas for large numbers
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            startIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-200">Register Family</h1>
            <p className="text-gray-100">Add a new family to the kebele system</p>
          </div>
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={fetchStats}
          startIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">
            <strong>Error loading statistics:</strong> {error}
          </p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Families Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Families</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatNumber(stats.total)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg. Members Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Avg. Members</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatAvgMembers(stats.avgMembers)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatNumber(stats.thisMonth)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Family Registration</CardTitle>
          <CardDescription>
            Register a new family. Search and select an existing individual as family head.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddFamilyForm onFamilyAdded={fetchStats} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFamily;
