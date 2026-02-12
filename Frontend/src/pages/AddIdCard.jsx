// import React from 'react';
// import { IdCard, ArrowLeft } from 'lucide-react';
// import AddIdCardForm from '../components/forms/AddIdCardForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const AddIdCard = () => {
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
//           <h1 className="text-3xl font-bold text-orange-100">Issue ID Card</h1>
//           <p className="text-blue-100">Create and issue identification cards</p>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <IdCard className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Total Issued</p>
//                 <p className="text-xl font-bold text-gray-900">856</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <IdCard className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 <p className="text-xl font-bold text-gray-900">64</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
//                 <IdCard className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Pending</p>
//                 <p className="text-xl font-bold text-gray-900">23</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <IdCard className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Coverage</p>
//                 <p className="text-xl font-bold text-gray-900">68%</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>ID Card Issuance</CardTitle>
//           <CardDescription>
//             Issue new identification cards for registered individuals. Search for the individual first to proceed.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddIdCardForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddIdCard;





import React, { useState, useEffect } from 'react';
import { IdCard, ArrowLeft, Users, Calendar, Clock, Percent } from 'lucide-react';
import AddIdCardForm from '../components/forms/AddIdCardForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddIdCard = () => {
  const [stats, setStats] = useState({
    totalIssued: 0,
    thisMonth: 0,
    pending: 0,
    coverage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIdCardStats();
  }, []);

  const fetchIdCardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/id-cards/stats');

      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStats({
          totalIssued: Number(result.data.totalIssued) || 0,
          thisMonth: Number(result.data.thisMonth) || 0,
          pending: Number(result.data.pending) || 0,
          coverage: Number(result.data.coverage) || 0
        });
      } else {
        setError(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching ID card stats:', err);
      setError(err.message);

      // Fallback to sample data for demo
      setStats({
        totalIssued: 856,
        thisMonth: 64,
        pending: 23,
        coverage: 68
      });
    } finally {
      setLoading(false);
    }
  };




  const handleBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    fetchIdCardStats();
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
            <h1 className="text-3xl font-bold text-blue-300">Issue ID Card</h1>
            <p className="text-gray-400">Add a new ID card to the kebele system</p>
            {/* <p className="text-blue-100">Create and issue Ethiopian National Identification Cards</p> */}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Issued */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Issued</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {stats.totalIssued.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">National ID Cards</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <IdCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {stats.thisMonth}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">New cards issued</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Pending Delivery</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {stats.pending}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Ready for pickup</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Coverage</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {stats.coverage}%
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Of registered individuals</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">
            <strong>Note:</strong> {error}. Showing sample data. Make sure the backend is running.
          </p>
        </div>
      )}

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ethiopian National ID Card Issuance</CardTitle>
          <CardDescription>
            Issue new National Identification Cards for registered individuals.
            Search for the individual by name, phone, or family number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddIdCardForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIdCard;