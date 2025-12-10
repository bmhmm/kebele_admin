// import React from 'react';
// import { Users, ArrowLeft, Download, Filter } from 'lucide-react';
// import IndividualsTable from '../components/tables/IndividualsTable';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const ListIndividuals = () => {
//   const handleBack = () => {
//     window.history.back();
//   };

//   const handleExport = () => {
//     console.log('Exporting individuals data...');
//     // Implement export functionality
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleBack}
//             startIcon={<ArrowLeft className="w-4 h-4" />}
//           >
//             Back
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-orange-100">Individuals</h1>
//             <p className="text-blue-100">Manage and view all registered individuals</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           <Button
//             variant="outline"
//             startIcon={<Filter className="w-4 h-4" />}
//           >
//             Filters
//           </Button>
//           <Button
//             variant="outline"
//             startIcon={<Download className="w-4 h-4" />}
//             onClick={handleExport}
//           >
//             Export
//           </Button>
//           <Button
//             startIcon={<Users className="w-4 h-4" />}
//             onClick={() => window.location.href = '/add-individual'}
//           >
//             Add Individual
//           </Button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Total</p>
//               <p className="text-2xl font-bold text-gray-900">1,247</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Male</p>
//               <p className="text-2xl font-bold text-gray-900">642</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Female</p>
//               <p className="text-2xl font-bold text-gray-900">605</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">With ID</p>
//               <p className="text-2xl font-bold text-gray-900">856</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Active</p>
//               <p className="text-2xl font-bold text-gray-900">1,189</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Individuals Management</CardTitle>
//           <CardDescription>
//             View, search, and manage all individuals in the system. Use filters to find specific records.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-0">
//           <IndividualsTable />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ListIndividuals;

import React, { useState, useEffect } from 'react';
import { Users, ArrowLeft, Download, Filter, X } from 'lucide-react';
import IndividualsTable from '../components/tables/IndividualsTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ListIndividuals = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    withId: 0, // Will remain 0 until ID system is implemented
    active: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    relationship: '',
    education: '',
    religion: '',
    searchTerm: ''
  });
  const [tableKey, setTableKey] = useState(0);

  const handleBack = () => {
    window.history.back();
  };

  // const handleExport = () => {
  //   console.log('Exporting individuals data...');
  // Implement export functionality
  // };







  {/* adding export functionality ended here */ }
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all individuals to calculate stats
      const response = await fetch('http://localhost:5000/api/individuals');

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const result = await response.json();

      if (result.success) {
        const individuals = result.data;

        // Calculate statistics from the data
        const maleCount = individuals.filter(ind => ind.gender === 'male').length;
        const femaleCount = individuals.filter(ind => ind.gender === 'female').length;

        // Assuming all individuals are active since you have is_active flag
        // If you want to filter by is_active, you'll need to add it to your model/API
        const activeCount = individuals.length;

        setStats({
          total: individuals.length,
          male: maleCount,
          female: femaleCount,
          withId: 0, // Keep as 0 for now
          active: activeCount
        });
      } else {
        throw new Error(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
      // Set default values if API fails
      setStats({
        total: 0,
        male: 0,
        female: 0,
        withId: 0,
        active: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Trigger table refresh with new filters
    setTableKey(prev => prev + 1);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      gender: '',
      relationship: '',
      education: '',
      religion: '',
      searchTerm: ''
    });
    setTableKey(prev => prev + 1);
    setShowFilters(false);
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      searchTerm
    }));
    setTableKey(prev => prev + 1);
  };

  // Format numbers with commas for better readability
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Loading skeleton component
  const StatSkeleton = () => (
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
      <div className="h-8 bg-gray-200 rounded w-20 mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
            <h1 className="text-3xl font-bold text-gray-900">Individuals</h1>
            <p className="text-gray-600">Manage and view all registered individuals</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            startIcon={<Filter className="w-4 h-4" />}
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            Filters
            {(filters.gender || filters.relationship || filters.education || filters.religion) && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            startIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            startIcon={<Users className="w-4 h-4" />}
            onClick={() => window.location.href = '/add-individual'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Individual
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filter Individuals</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                startIcon={<X className="w-4 h-4" />}
              >
                Close
              </Button>
            </div>

            <form onSubmit={handleFilterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 focus:border-transparent"
                  >
                    <option value="" className="text-gray-900">All Genders</option>
                    <option value="male" className="text-gray-900">Male</option>
                    <option value="female" className="text-gray-900">Female</option>
                  </select>
                </div>

                {/* Relationship Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship
                  </label>
                  <select
                    name="relationship"
                    value={filters.relationship}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="" className="text-gray-900">All Relationships</option>
                    <option value="head" className="text-gray-900">Head</option>
                    <option value="spouse" className="text-gray-900">Spouse</option>
                    <option value="child" className="text-gray-900">Child</option>
                    <option value="parent" className="text-gray-900">Parent</option>
                    <option value="sibling" className="text-gray-900">Sibling</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>

                {/* Education Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <select
                    name="education"
                    value={filters.education}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="" className="text-gray-900">All Education Levels</option>
                    <option value="none" className="text-gray-900">No Formal Education</option>
                    <option value="primary" className="text-gray-900">Primary School</option>
                    <option value="secondary" className="text-gray-900">Secondary School</option>
                    <option value="diploma" className="text-gray-900">Diploma</option>
                    <option value="bachelor" className="text-gray-900">Bachelor's Degree</option>
                    <option value="masters" className="text-gray-900">Master's Degree</option>
                    <option value="phd" className="text-gray-900">PhD</option>
                  </select>
                </div>

                {/* Religion Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Religion
                  </label>
                  <select
                    name="religion"
                    value={filters.religion}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="" className="text-gray-900">All Religions</option>
                    <option value="islam" className="text-gray-900">Islam</option>
                    <option value="orthodox" className="text-gray-900">Orthodox Christian</option>
                    <option value="protestant" className="text-gray-900">Protestant</option>
                    <option value="catholic" className="text-gray-900">Catholic</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>
              </div>

              {/* Search Filter */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search by Name, Phone, Family or House Number
                </label>
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search..."
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search by Name or House Number
                </label>
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by name or house number..."
                />
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Apply Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Total Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Total Individuals</p>
              {loading ? (
                <StatSkeleton />
              ) : error ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-red-500">Error</p>
                  <p className="text-xs text-gray-500 mt-1">Could not load</p>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatNumber(stats.total)}
                  </p>
                  <div className="text-xs text-green-600 font-medium">
                    All registered individuals
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Male Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Male</p>
              {loading ? (
                <StatSkeleton />
              ) : error ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-red-500">Error</p>
                  <p className="text-xs text-gray-500 mt-1">Could not load</p>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatNumber(stats.male)}
                  </p>
                  <div className="text-xs text-blue-600 font-medium">
                    {stats.total > 0 ? `${Math.round((stats.male / stats.total) * 100)}% of total` : '0%'}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Female Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Female</p>
              {loading ? (
                <StatSkeleton />
              ) : error ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-red-500">Error</p>
                  <p className="text-xs text-gray-500 mt-1">Could not load</p>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatNumber(stats.female)}
                  </p>
                  <div className="text-xs text-purple-600 font-medium">
                    {stats.total > 0 ? `${Math.round((stats.female / stats.total) * 100)}% of total` : '0%'}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* With ID Card (Coming Soon) */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">With ID</p>
              {loading ? (
                <StatSkeleton />
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatNumber(stats.withId)}
                  </p>
                  <div className="text-xs text-yellow-600 font-medium">
                    ID System Coming Soon
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Active</p>
              {loading ? (
                <StatSkeleton />
              ) : error ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-red-500">Error</p>
                  <p className="text-xs text-gray-500 mt-1">Could not load</p>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatNumber(stats.active)}
                  </p>
                  <div className="text-xs text-green-600 font-medium">
                    Currently active records
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">
            <strong>Error loading statistics:</strong> {error}
          </p>
          <button
            onClick={fetchStats}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Individuals Management</CardTitle>
          <CardDescription>
            View, search, and manage all individuals in the system. Use filters to find specific records.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <IndividualsTable
            key={tableKey}
            filters={filters}
            onSearch={handleSearch}
            onRefreshStats={fetchStats}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListIndividuals;