// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Save, User } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

// const EditIndividual = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState(null);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         dob: '',
//         age: '',
//         gender: '',
//         religion: '',
//         nationality: 'ethiopian',
//         occupation: '',
//         education: '',
//         familyNumber: '',
//         houseNumber: '',
//         relationship: '',
//         phone: '',
//         email: ''
//     });

//     // Fetch individual data
//     useEffect(() => {
//         const fetchIndividual = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`http://localhost:5000/api/individuals/${id}`);

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch individual data');
//                 }

//                 const result = await response.json();

//                 if (result.success) {
//                     setFormData(result.data);
//                 } else {
//                     throw new Error(result.message || 'Failed to load individual');
//                 }
//             } catch (err) {
//                 console.error('Error:', err);
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchIndividual();
//         }
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setSaving(true);

//             const response = await fetch(`http://localhost:5000/api/individuals/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             if (!response.ok) {
//                 throw new Error(result.message || 'Failed to update individual');
//             }

//             alert('Individual updated successfully!');
//             navigate('/list-individuals');

//         } catch (err) {
//             console.error('Error:', err);
//             setError(err.message);
//             alert(`Error: ${err.message}`);
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleBack = () => {
//         navigate('/list-individuals');
//     };

//     if (loading) {
//         return (
//             <div className="max-w-6xl mx-auto p-6">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading individual data...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="max-w-6xl mx-auto p-6">
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//                     <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
//                     <p className="text-red-700 mb-4">{error}</p>
//                     <Button onClick={handleBack} startIcon={<ArrowLeft className="w-4 h-4" />}>
//                         Back to List
//                     </Button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center space-x-4">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={handleBack}
//                         startIcon={<ArrowLeft className="w-4 h-4" />}
//                     >
//                         Back
//                     </Button>
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">Edit Individual</h1>
//                         <p className="text-gray-600">Update information for {formData.firstName} {formData.lastName}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Form */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Edit Individual Information</CardTitle>
//                     <p className="text-gray-600">Update the fields below and save changes</p>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* First Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     First Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>

//                             {/* Last Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Last Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>

//                             {/* Add more fields similar to AddIndividualForm.jsx */}
//                             {/* Copy all the form fields from AddIndividualForm.jsx here */}
//                             {/* Date of Birth, Age, Gender, Religion, Occupation, Education, etc. */}
//                         </div>

//                         {/* Form Actions */}
//                         <div className="flex justify-end space-x-4 pt-6">
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={handleBack}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 disabled={saving}
//                                 startIcon={saving ? null : <Save className="w-4 h-4" />}
//                             >
//                                 {saving ? (
//                                     <>
//                                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                                         Saving...
//                                     </>
//                                 ) : (
//                                     'Save Changes'
//                                 )}
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default EditIndividual;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Calendar, GraduationCap, Briefcase, Home, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const EditIndividual = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
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
    });

    // Fetch individual data
    useEffect(() => {
        const fetchIndividual = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/individuals/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch individual data');
                }

                const result = await response.json();

                if (result.success) {
                    const individualData = result.data;

                    // Format date for input field
                    if (individualData.dob && individualData.dob.includes('T')) {
                        individualData.dob = individualData.dob.split('T')[0];
                    }

                    setFormData(individualData);
                } else {
                    throw new Error(result.message || 'Failed to load individual');
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchIndividual();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-calculate age when DOB changes
        if (name === 'dob' && value) {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData(prev => ({ ...prev, age: age.toString() }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);

            // Format the date for MySQL
            const formattedData = {
                ...formData,
                dob: formData.dob.includes('T') ? formData.dob.split('T')[0] : formData.dob
            };

            const response = await fetch(`http://localhost:5000/api/individuals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update individual');
            }

            alert('Individual updated successfully!');
            navigate('/list-individuals');

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            alert(`Error: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleBack = () => {
        navigate('/list-individuals');
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading individual data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
                    <p className="text-red-700 mb-4">{error}</p>
                    <Button onClick={handleBack} startIcon={<ArrowLeft className="w-4 h-4" />}>
                        Back to List
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
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
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit {formData.firstName} {formData.lastName}
                        </h1>
                        <p className="text-gray-600">Update individual information</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Edit Individual Information</CardTitle>
                    <p className="text-gray-600">Update the fields below and save changes</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age *
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="1"
                                        max="120"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* Religion */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Religion *
                                    </label>
                                    <select
                                        name="religion"
                                        value={formData.religion}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Religion</option>
                                        <option value="islam">Islam</option>
                                        <option value="orthodox">Orthodox Christian</option>
                                        <option value="protestant">Protestant</option>
                                        <option value="catholic">Catholic</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Occupation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Occupation *
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="occupation"
                                            value={formData.occupation}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Education Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Education Level *
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
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
                                </div>

                                {/* Relationship */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Relationship *
                                    </label>
                                    <select
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Relationship</option>
                                        <option value="head">Head</option>
                                        <option value="spouse">Spouse</option>
                                        <option value="child">Child</option>
                                        <option value="parent">Parent</option>
                                        <option value="sibling">Sibling</option>
                                        <option value="other">Other Relative</option>
                                    </select>
                                </div>

                                {/* Nationality */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nationality *
                                    </label>
                                    <select
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="ethiopian">Ethiopian</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Family & Contact Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Home className="w-5 h-5 mr-2" />
                                Family & Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Family Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Family Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="familyNumber"
                                        value={formData.familyNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* House Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        House Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="houseNumber"
                                        value={formData.houseNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="+251 9XX XXX XXX"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email (Optional)
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="example@domain.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                startIcon={saving ? null : <Save className="w-4 h-4" />}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditIndividual;