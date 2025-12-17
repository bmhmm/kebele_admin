import React, { useState, useEffect } from 'react';
// In FamiliesTable.jsx
import { useMembersPopup } from '../../contexts/MembersPopupContext';



import {
  Search,
  Eye,
  Edit,
  Users,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Home,
  Phone,
  MapPin,
  User, UserPlus, X
} from 'lucide-react';
// Add to your imports at the top:



const FamiliesTable = () => {

  const { isPopupOpen, selectedFamilyId, closePopup } = useMembersPopup();

  // When selectedFamilyId changes, show popup
  useEffect(() => {
    if (selectedFamilyId) {
      // Find the family and show popup
      const family = families.find(f => f.id === selectedFamilyId);
      if (family) {
        showFamilyMembers(family);
      }
    }
  }, [selectedFamilyId]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    head: '',
    zone: 'all',
    houseNumber: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  {/*modal state varibales*/ }

  // Add to your existing useState declarations (near the top):
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  {/* ending of modal state variables*/ }

  // Mock data - replace with actual API call


  {/* replacing the mock data with the real one*/ }

  // Replace the ENTIRE useEffect (around line 50-100) with:

  useEffect(() => {
    const fetchFamilies = async () => {
      setLoading(true);
      try {
        // REAL API CALL
        const response = await fetch('http://localhost:5000/api/families');

        if (!response.ok) {
          throw new Error('Failed to fetch families');
        }

        const result = await response.json();

        if (result.success) {
          // Transform API data to match your frontend structure
          const formattedFamilies = result.data.map(family => ({
            id: family.id,
            familyNumber: family.family_number,
            head: {
              name: family.head_name || `${family.head?.firstName} ${family.head?.lastName}`,
              phone: family.head_phone || family.head?.phone
            },
            members: [], // Will need separate API call for members
            house: {
              houseNumber: family.house_number,
              zone: family.zone,
              address: family.address
            },
            member_count: family.member_count || 0
          }));

          setFamilies(formattedFamilies);


        } else {
          throw new Error(result.message || 'Failed to load families');
        }
      } catch (error) {
        console.error('Error fetching families:', error);
        // Keep mock data as fallback for testing
        // setFamilies(mockData); // Comment out when API works
      } finally {
        setLoading(false);
      }
    };

    fetchFamilies();
  }, []);
  {/* ending replacing of it*/ }

  // Filter and search logic
  const filteredFamilies = families.filter(family => {
    const matchesSearch =
      family.familyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.house.houseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesHead = !filters.head || family.head.name.toLowerCase().includes(filters.head.toLowerCase());
    const matchesZone = filters.zone === 'all' || family.house.zone === filters.zone;
    const matchesHouse = !filters.houseNumber || family.house.houseNumber.toLowerCase().includes(filters.houseNumber.toLowerCase());

    return matchesSearch && matchesHead && matchesZone && matchesHouse;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFamilies = filteredFamilies.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // const handleAction = (action, family) => {
  //   setShowActionsMenu(null);
  //   switch (action) {
  //     case 'view':
  //       setSelectedFamily(family);
  //       break;
  //     case 'edit':
  //       console.log('Edit family:', family);
  //       break;
  //     case 'members':
  //       console.log('View members of:', family);
  //       break;
  //     case 'export':
  //       console.log('Export data for:', family);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  {/*updating the handle action function */ }
  const handleAction = (action, family) => {
    setShowActionsMenu(null);
    switch (action) {
      case 'view':
        setSelectedFamily(family);
        break;
      case 'edit':
        console.log('Edit family:', family);
        break;
      case 'add-members':  // ADD THIS CASE
        // Navigate to add members page
        window.location.href = `/families/${family.id}/add-members`;
        break;
      case 'members':  // ← ADD THIS CASE! This is for the Users icon
        showFamilyMembers(family);  // Call the function to show members popup
        break;
      // case 'members':
      //   console.log('View members of:', family);
      //   break;
      case 'export':
        console.log('Export data for:', family);
        break;
      default:
        break;
    }
  };
  {/* ending updating handle action family*/ }

  {/*starting is showing members function*/ }

  // Add this function near other functions (after handleAction):
  const showFamilyMembers = async (family) => {
    try {
      console.log('Showing members for family:', family.familyNumber);

      // Fetch members from API
      const response = await fetch(`http://localhost:5000/api/families/${family.id}/members`);
      const result = await response.json();

      if (result.success) {
        console.log('Members found:', result.data);
        // Show modal with members
        setSelectedFamilyMembers(result.data);
        setShowMembersModal(true);
      } else {
        console.log('No members found');
        setSelectedFamilyMembers([]);
        setShowMembersModal(true);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setSelectedFamilyMembers([]);
      setShowMembersModal(true);
    }
  };

  {/*ending of showing members function*/ }

  const clearFilters = () => {
    setFilters({
      head: '',
      zone: 'all',
      houseNumber: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading families data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Registered Families</h2>
            <p className="text-gray-600">Manage and view all families in the system</p>
          </div>

          <div className="flex items-center space-x-4">

          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by family number, head name, house number..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
            </div>
          </div>

          {/* Head Name Filter */}
          <div>
            <input
              type="text"
              placeholder="Head of Family"
              value={filters.head}
              onChange={(e) => handleFilterChange('head', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            />
          </div>

          {/* Zone Filter */}
          <div>
            <select
              value={filters.zone}
              onChange={(e) => handleFilterChange('zone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            >
              <option value="all">All Zones</option>
              <option value="Zone 1">Zone 1</option>
              <option value="Zone 2">Zone 2</option>
              <option value="Zone 3">Zone 3</option>
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* House Number Filter */}
          <div>
            <input
              type="text"
              placeholder="House Number"
              value={filters.houseNumber}
              onChange={(e) => handleFilterChange('houseNumber', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            />
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={clearFilters}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Families List</h3>
              <p className="text-sm text-gray-600">
                Showing {paginatedFamilies.length} of {filteredFamilies.length} families
              </p>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Family #</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Head of Family</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Members</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">House #</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Zone</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Address</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedFamilies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <div className="text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No families found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedFamilies.map((family) => (
                  <tr
                    key={family.id}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="font-mono font-semibold text-gray-900">
                          {family.familyNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">
                          {family.head.name}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{family.head.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {/*{family.members.length} members*/}
                          {/*enabling fetch real count from count*/}
                          {family.member_count || family.members?.length || 0} members
                          {/*ending enabling fetch real count*/}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {family.members.slice(0, 3).map((member, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-medium"
                            >
                              {member.name.split(' ')[0]}
                              {member.relationship === 'Head' && ' 👑'}
                            </span>
                          ))}
                          {family.members.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 font-medium">
                              +{family.members.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-sm text-gray-900">
                          {family.house.houseNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {family.house.zone}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{family.house.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('view', family)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('edit', family)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('members', family)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          title="View Members"
                        >
                          <Users className="w-4 h-4" />
                        </button>

                        {/* adding addmembers button*/}
                        <button
                          onClick={() => handleAction('add-members', family)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          title="Add Members"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        {/* ending of adding members button*/}

                        {/* More Actions Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setShowActionsMenu(showActionsMenu === family.id ? null : family.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {showActionsMenu === family.id && (
                            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                              <button
                                onClick={() => handleAction('export', family)}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                              >
                                <Download className="w-4 h-4" />
                                <span>Export Data</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginatedFamilies.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredFamilies.length)} of{' '}
                {filteredFamilies.length} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Family Detail Modal */}
      {selectedFamily && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Family Details</h3>
                <button
                  onClick={() => setSelectedFamily(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Family Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Family Information</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Family Number</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {selectedFamily.familyNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Head of Family</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedFamily.head.name}
                      </dd>
                      <dd className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                        <Phone className="w-4 h-4" />
                        <span>{selectedFamily.head.phone}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Total Members</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedFamily.members.length} family members
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* House Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">House Information</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">House Number</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedFamily.house.houseNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Zone</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedFamily.house.zone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="text-sm text-gray-600">
                        {selectedFamily.house.address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Family Members */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedFamily.members.map((member, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className={`text-xs font-medium ${member.relationship === 'Head'
                              ? 'text-green-600'
                              : 'text-gray-500'
                              }`}>
                              {member.relationship}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*member modal*/}
      {/* Members Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Family Members</h3>
                  <p className="text-gray-600">
                    {selectedFamilyMembers.length} member{selectedFamilyMembers.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setShowMembersModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedFamilyMembers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No members found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    This family has no additional members yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedFamilyMembers.map((member, index) => (
                    <div
                      key={member.id || index}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {member.first_name?.[0] || member.firstName?.[0]}
                        {member.last_name?.[0] || member.lastName?.[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {member.first_name || member.firstName} {member.last_name || member.lastName}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="capitalize">{member.relationship || 'member'}</span>
                            {member.gender && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                                {member.gender}
                              </span>
                            )}
                          </div>
                          {member.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{member.phone}</span>
                            </div>
                          )}
                          {member.age && (
                            <div className="text-xs text-gray-500">Age: {member.age}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                {/* <button
                  onClick={() => navigate(`/families/${family.id}/add-members`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Members
                </button> */}
                <button
                  onClick={() => setShowMembersModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*ending of member modal*/}
    </div>
  );
};

export default FamiliesTable;