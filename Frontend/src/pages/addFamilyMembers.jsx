import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Users,
    UserPlus,
    Search,
    Home,
    Phone,
    Hash,
    User,
    ArrowLeft,
    Check,
    X,
    AlertCircle,
    Users as UsersIcon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMembersPopup } from '../contexts/MembersPopupContext';

const AddFamilyMembers = () => {
    const { familyId } = useParams();
    const { openPopup } = useMembersPopup();
    const navigate = useNavigate();

    // States
    const [family, setFamily] = useState(null);
    const [existingMembers, setExistingMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch family details
    useEffect(() => {
        fetchFamilyDetails();
    }, [familyId]);

    const fetchFamilyDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/families/${familyId}`);
            const result = await response.json();

            if (result.success) {
                setFamily(result.data);
                // Extract existing members from family data
                if (result.data.members) {
                    setExistingMembers(result.data.members);
                }
            } else {
                setError('Family not found');
            }
        } catch (err) {
            console.error('Error fetching family:', err);
            setError('Failed to load family details');
        } finally {
            setIsLoading(false);
        }
    };

    // Search for available individuals
    const searchIndividuals = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `http://localhost:5000/api/families/available-individuals?q=${encodeURIComponent(query)}`
            );
            const result = await response.json();

            if (result.success) {
                // Filter out individuals already in this family
                const filteredResults = result.data.filter(ind =>
                    !existingMembers.some(member => member.id === ind.id) &&
                    !newMembers.some(member => member.id === ind.id)
                );
                setSearchResults(filteredResults);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 2) {
            searchIndividuals(query);
        } else {
            setSearchResults([]);
        }
    };

    // Add individual as new member
    const addMember = (individual) => {
        const newMember = {
            id: individual.id,
            first_name: individual.first_name,
            last_name: individual.last_name,
            phone: individual.phone,
            gender: individual.gender,
            house_number: individual.house_number || individual.houseNumber,
            relationship: 'child', // Default relationship
            age: individual.age
        };

        setNewMembers([...newMembers, newMember]);
        setSearchQuery('');
        setSearchResults([]);
    };

    // Remove from new members list
    const removeNewMember = (index) => {
        setNewMembers(newMembers.filter((_, i) => i !== index));
    };

    // Update member relationship
    const updateMemberRelationship = (index, relationship) => {
        const updatedMembers = [...newMembers];
        updatedMembers[index].relationship = relationship;
        setNewMembers(updatedMembers);
    };

    // Submit new members
    const submitMembers = async () => {
        if (newMembers.length === 0) {
            setError('Please add at least one member');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Add each member to family
            const promises = newMembers.map(member =>
                fetch(`http://localhost:5000/api/families/${familyId}/members`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ individualId: member.id })
                })
            );

            const responses = await Promise.all(promises);
            const results = await Promise.all(responses.map(r => r.json()));

            // Check for any errors
            const failed = results.filter(r => !r.success);
            if (failed.length > 0) {
                throw new Error(failed[0].message || 'Some members could not be added');
            }

            setSuccess(`${newMembers.length} member(s) added successfully!`);
            setNewMembers([]);

            // Refresh family details
            setTimeout(() => {
                fetchFamilyDetails();
            }, 1000);

        } catch (err) {
            console.error('Error adding members:', err);
            setError(err.message || 'Failed to add members');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle back
    const handleBack = () => {
        navigate(`/list-families`);
    };

    // Handle view family
    const handleViewFamily = () => {
        // navigate(`/families/${familyId}`);
        // navigate(`/families?showMembers=${familyId}`);
        openPopup(familyId);
        navigate('/families');

    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading family details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !family) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-red-800 mb-2">Family Not Found</h2>
                        <p className="text-red-600 mb-6">{error}</p>
                        <Button onClick={handleBack} startIcon={<ArrowLeft className="w-4 h-4" />}>
                            Back to Families List
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
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
                            <h1 className="text-3xl font-bold text-gray-900">Add Family Members</h1>
                            <p className="text-gray-600">Add new members to {family?.head?.firstName}'s family</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* <Button
                            variant="outline"
                            size="sm" 
                            onClick={handleViewFamily}
                            startIcon={<UsersIcon className="w-4 h-4" />}
                        >
                            View Family
                        </Button> */}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <Check className="w-5 h-5 text-green-600 mr-3" />
                            <p className="text-green-800">{success}</p>
                        </div>
                    </div>
                )}

                {/* Family Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Family Information</CardTitle>
                        <CardDescription>Details of the family you're adding members to</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Family Number</label>
                                    <div className="flex items-center space-x-2">
                                        <Hash className="w-4 h-4 text-gray-400" />
                                        <span className="font-mono text-lg font-semibold text-gray-900">
                                            {family?.family_number}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Head of Family</label>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {family?.head?.firstName} {family?.head?.lastName}
                                            </div>
                                            <div className="text-sm text-gray-600">{family?.head?.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">House Number</label>
                                    <div className="flex items-center space-x-2">
                                        <Home className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-900">{family?.house_number}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Members</label>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-900">
                                            {existingMembers.length + 1} total ({existingMembers.length} members + head)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Add New Members */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Members</CardTitle>
                                <CardDescription>Search and add individuals to this family</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Search Bar */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Individuals
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                            placeholder="Search by name, phone, or house number..."
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Only individuals not in any family will be shown
                                    </p>
                                </div>

                                {/* Search Results */}
                                {searchResults.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">Search Results</h3>
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                            {searchResults.map((individual) => (
                                                <div
                                                    key={individual.id}
                                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                            {individual.first_name?.[0]}{individual.last_name?.[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {individual.first_name} {individual.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-600 space-y-1">
                                                                <div className="flex items-center space-x-2">
                                                                    <Phone className="w-3 h-3" />
                                                                    <span>{individual.phone}</span>
                                                                </div>
                                                                {individual.house_number && (
                                                                    <div className="flex items-center space-x-2">
                                                                        <Home className="w-3 h-3" />
                                                                        <span>House: {individual.house_number}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => addMember(individual)}
                                                        startIcon={<UserPlus className="w-4 h-4" />}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Members List */}
                                {newMembers.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                                            Members to Add ({newMembers.length})
                                        </h3>
                                        <div className="space-y-3">
                                            {newMembers.map((member, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 border border-gray-200 rounded-xl bg-white"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                                {member.first_name?.[0]}{member.last_name?.[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {member.first_name} {member.last_name}
                                                                </div>
                                                                <div className="text-sm text-gray-600">{member.phone}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeNewMember(index)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Relationship to Head
                                                        </label>
                                                        <select
                                                            value={member.relationship}
                                                            onChange={(e) => updateMemberRelationship(index, e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                        >
                                                            <option value="spouse">Spouse</option>
                                                            <option value="child">Child</option>
                                                            <option value="parent">Parent</option>
                                                            <option value="sibling">Sibling</option>
                                                            <option value="grandchild">Grandchild</option>
                                                            <option value="other">Other Relative</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6">
                                            <Button
                                                onClick={submitMembers}
                                                disabled={isSubmitting}
                                                className="w-full"
                                                size="lg"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                        Adding Members...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="w-5 h-5 mr-2" />
                                                        Add {newMembers.length} Member{newMembers.length !== 1 ? 's' : ''} to Family
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Existing Members */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Family Members</CardTitle>
                                <CardDescription>People already in this family</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {existingMembers.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-600">No additional members yet</p>
                                        <p className="text-sm text-gray-500 mt-1">Add members using the search on the left</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Head of Family */}
                                        <div className="p-4 border border-green-200 rounded-xl bg-green-50">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                                    <User className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-semibold text-gray-900">
                                                                {family?.head?.firstName} {family?.head?.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-600">{family?.head?.phone}</div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                            Head
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Other Members */}
                                        {existingMembers.map((member, index) => (
                                            <div
                                                key={member.id}
                                                className="p-4 border border-gray-200 rounded-xl bg-white"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                        {member.firstName?.[0]}{member.lastName?.[0]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {member.firstName} {member.lastName}
                                                                </div>
                                                                <div className="text-sm text-gray-600">{member.phone}</div>
                                                            </div>
                                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                                                                {member.relationship || 'member'}
                                                            </span>
                                                        </div>
                                                        {member.age && (
                                                            <div className="mt-2">
                                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                                                    Age: {member.age}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between pt-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        startIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                        Back to Families List
                    </Button>

                    <div className="flex space-x-3">
                        {/* <Button
                            variant="outline"
                            onClick={handleViewFamily}
                            startIcon={<UsersIcon className="w-4 h-4" />}
                        >
                            View Family Details
                        </Button> */}
                        {/* <Button
                            onClick={() => navigate('/families/add')}
                            startIcon={<UserPlus className="w-4 h-4" />}
                        >
                            Create Another Family
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFamilyMembers;