// import React from 'react';
// import { Users, ArrowLeft, Download, Filter, UserPlus } from 'lucide-react';
// import FamiliesTable from '../components/tables/FamiliesTable';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const ListFamilies = () => {
//   const handleBack = () => {
//     window.history.back();
//   };

//   const handleExport = () => {
//     console.log('Exporting families data...');
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
//             <h1 className="text-3xl font-bold text-orange-100">Families</h1>
//             <p className="text-blue-100">Manage and view all registered families</p>
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
//             startIcon={<UserPlus className="w-4 h-4" />}
//             onClick={() => window.location.href = '/add-family'}
//           >
//             Add Family
//           </Button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Total Families</p>
//               <p className="text-2xl font-bold text-gray-900">342</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Total Members</p>
//               <p className="text-2xl font-bold text-gray-900">1,247</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">Avg. per Family</p>
//               <p className="text-2xl font-bold text-gray-900">3.6</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm font-medium text-gray-900">This Month</p>
//               <p className="text-2xl font-bold text-gray-900">15</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Families Management</CardTitle>
//           <CardDescription>
//             View, search, and manage all families in the system. Click on families to view detailed information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-0">
//           <FamiliesTable />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ListFamilies;






import React, { useState, useEffect } from 'react';
import { Users, ArrowLeft, Download, Filter, UserPlus, Home, UserCheck, Calendar, UsersIcon } from 'lucide-react';
import FamiliesTable from '../components/tables/FamiliesTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ListFamilies = () => {
  const [stats, setStats] = useState({
    totalFamilies: 0,
    totalMembers: 0,
    avgPerFamily: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFamilyStats();
  }, []);

  const fetchFamilyStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/families/stats');

      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Adjust based on your actual API response structure
        setStats({
          totalFamilies: result.data.totalFamilies || result.data.total || 0,
          totalMembers: result.data.totalMembers || result.data.totalMembersCount || 0,
          avgPerFamily: result.data.avgPerFamily || result.data.average || 0,
          thisMonth: result.data.thisMonth || result.data.newThisMonth || 0
        });
      } else {
        setError(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching family stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleExport = () => {
    console.log('Exporting families data...');
    // Implement export functionality
  };

  const handleRefresh = () => {
    fetchFamilyStats();
  };

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
            <h1 className="text-3xl font-bold text-orange-100">Families</h1>
            <p className="text-blue-100">Manage and view all registered families</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="outline"
            startIcon={<Filter className="w-4 h-4" />}
          >
            Filters
          </Button>
          <Button
            variant="outline"
            startIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            startIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => window.location.href = '/add-family'}
          >
            Add Family
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Families Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Families</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalFamilies.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Members Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Members</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalMembers.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average per Family Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Avg. per Family</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.avgPerFamily.toFixed(1)}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.thisMonth}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Families Management</CardTitle>
              <CardDescription>
                View, search, and manage all families in the system. Click on families to view detailed information.
              </CardDescription>
            </div>
            {error && (
              <div className="text-red-600 text-sm">
                <p>Failed to load statistics: {error}</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <FamiliesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListFamilies;