import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  IdCard, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  User,
  Mail,
  Phone,
  Home
} from 'lucide-react';

const IndividualsTable = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: 'all',
    zone: 'all',
    education: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchIndividuals = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData = [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            age: 32,
            gender: 'male',
            occupation: 'Teacher',
            familyNumber: 'FAM001',
            houseNumber: 'H001',
            email: 'john.doe@email.com',
            phone: '+251911223344',
            education: 'bachelor',
            idCardStatus: 'issued',
            zone: 'Zone 1'
          },
          {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            age: 28,
            gender: 'female',
            occupation: 'Nurse',
            familyNumber: 'FAM002',
            houseNumber: 'H002',
            email: 'jane.smith@email.com',
            phone: '+251922334455',
            education: 'diploma',
            idCardStatus: 'pending',
            zone: 'Zone 2'
          },
          {
            id: 3,
            firstName: 'Michael',
            lastName: 'Johnson',
            age: 45,
            gender: 'male',
            occupation: 'Farmer',
            familyNumber: 'FAM003',
            houseNumber: 'H003',
            email: 'michael.j@email.com',
            phone: '+251933445566',
            education: 'secondary',
            idCardStatus: 'not_issued',
            zone: 'Zone 1'
          },
          {
            id: 4,
            firstName: 'Sarah',
            lastName: 'Williams',
            age: 29,
            gender: 'female',
            occupation: 'Business Owner',
            familyNumber: 'FAM004',
            houseNumber: 'H004',
            email: 'sarah.w@email.com',
            phone: '+251944556677',
            education: 'masters',
            idCardStatus: 'issued',
            zone: 'Zone 3'
          },
          {
            id: 5,
            firstName: 'Robert',
            lastName: 'Brown',
            age: 35,
            gender: 'male',
            occupation: 'Engineer',
            familyNumber: 'FAM005',
            houseNumber: 'H005',
            email: 'robert.b@email.com',
            phone: '+251955667788',
            education: 'bachelor',
            idCardStatus: 'issued',
            zone: 'Zone 2'
          }
        ];
        
        setIndividuals(mockData);
      } catch (error) {
        console.error('Error fetching individuals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndividuals();
  }, []);

  // Filter and search logic
  const filteredIndividuals = individuals.filter(individual => {
    const matchesSearch = 
      individual.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.familyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.houseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = filters.gender === 'all' || individual.gender === filters.gender;
    const matchesZone = filters.zone === 'all' || individual.zone === filters.zone;
    const matchesEducation = filters.education === 'all' || individual.education === filters.education;

    return matchesSearch && matchesGender && matchesZone && matchesEducation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredIndividuals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIndividuals = filteredIndividuals.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      issued: { color: 'bg-green-100 text-green-800', label: 'Issued' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      not_issued: { color: 'bg-red-100 text-red-800', label: 'Not Issued' }
    };
    
    const config = statusConfig[status] || statusConfig.not_issued;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getEducationLevel = (level) => {
    const educationMap = {
      none: 'No Formal Education',
      primary: 'Primary School',
      secondary: 'Secondary School',
      diploma: 'Diploma',
      bachelor: "Bachelor's Degree",
      masters: "Master's Degree",
      phd: 'PhD'
    };
    return educationMap[level] || level;
  };

  const handleAction = (action, individual) => {
    setShowActionsMenu(null);
    switch (action) {
      case 'view':
        setSelectedIndividual(individual);
        break;
      case 'edit':
        console.log('Edit individual:', individual);
        break;
      case 'issue_id':
        console.log('Issue ID for:', individual);
        break;
      case 'export':
        console.log('Export data for:', individual);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading individuals data...</p>
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
            <h2 className="text-xl font-semibold text-gray-900">Registered Individuals</h2>
            <p className="text-gray-600">Manage and view all individuals in the system</p>
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
                placeholder="Search by name, family number, house number..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
          {/* Education Filter */}
          <div>
            <select
              value={filters.education}
              onChange={(e) => handleFilterChange('education', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            >
              <option value="all">All Education Levels</option>
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Individuals List</h3>
              <p className="text-sm text-gray-600">
                Showing {paginatedIndividuals.length} of {filteredIndividuals.length} individuals
              </p>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Age</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Gender</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Occupation</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Family #</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">House #</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">ID Card</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedIndividuals.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center">
                    <div className="text-gray-500">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No individuals found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedIndividuals.map((individual) => (
                  <tr 
                    key={individual.id} 
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {individual.firstName.charAt(0)}{individual.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {individual.firstName} {individual.lastName}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Mail className="w-3 h-3" />
                            <span>{individual.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{individual.age} years</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        individual.gender === 'male' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {individual.gender.charAt(0).toUpperCase() + individual.gender.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">{individual.occupation}</div>
                      <div className="text-xs text-gray-500">
                        {getEducationLevel(individual.education)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 font-mono">{individual.familyNumber}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 font-mono">{individual.houseNumber}</span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(individual.idCardStatus)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('view', individual)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('edit', individual)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('issue_id', individual)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          title="Issue ID Card"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>
                        
                        {/* More Actions Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setShowActionsMenu(showActionsMenu === individual.id ? null : individual.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {showActionsMenu === individual.id && (
                            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                              <button
                                onClick={() => handleAction('export', individual)}
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
        {paginatedIndividuals.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredIndividuals.length)} of{' '}
                {filteredIndividuals.length} results
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
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
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

      {/* Individual Detail Modal */}
      {selectedIndividual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Individual Details</h3>
                <button
                  onClick={() => setSelectedIndividual(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Information</h4>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Full Name</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedIndividual.firstName} {selectedIndividual.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Age & Gender</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedIndividual.age} years, {selectedIndividual.gender}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Occupation</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedIndividual.occupation}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Email</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedIndividual.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Phone</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedIndividual.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualsTable;