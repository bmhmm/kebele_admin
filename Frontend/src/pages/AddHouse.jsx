// import React from 'react';
// import { Home, ArrowLeft } from 'lucide-react';
// import AddHouseForm from '../components/forms/AddHouseForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const AddHouse = () => {
//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="space-y-6">
//       {/*Header*/}
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
//           <h1 className="text-3xl font-bold text-orange-100">Register House</h1>
//           <p className="text-blue-100">Add a new house property to the system</p>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Total Houses</p>
//                 <p className="text-xl font-bold text-gray-900">289</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Occupied</p>
//                 <p className="text-xl font-bold text-gray-900">234</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Vacant</p>
//                 <p className="text-xl font-bold text-gray-900">42</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 <p className="text-xl font-bold text-gray-900">8</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>House Registration</CardTitle>
//           <CardDescription>
//             Register a new house property with complete details including location and ownership information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddHouseForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddHouse;






// import React, { useState, useEffect } from 'react';
// import { Home, ArrowLeft } from 'lucide-react';
// import AddHouseForm from '../components/forms/AddHouseForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { houseService } from '../services/houseServices';
// import { toast } from 'react-hot-toast';

// const AddHouse = () => {
//   const [statistics, setStatistics] = useState({
//     total_houses: 0,
//     occupied: 0,
//     vacant: 0,
//     this_month: 0
//   });
//   const [loading, setLoading] = useState(true);

//   const handleBack = () => {
//     window.history.back();
//   };

//   const fetchStatistics = async () => {
//     try {
//       setLoading(true);
//       const response = await houseService.getStatistics();

//       if (response.success) {
//         setStatistics({
//           total_houses: response.data.total_houses,
//           occupied: response.data.occupied,
//           vacant: response.data.vacant,
//           this_month: response.data.this_month
//         });
//       } else {
//         toast.error('Failed to load statistics');
//       }
//     } catch (error) {
//       console.error('Error fetching statistics:', error);
//       toast.error('Failed to load statistics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatistics();
//   }, []);

//   const handleHouseCreated = () => {
//     // Refresh statistics when a new house is created
//     fetchStatistics();
//   };

//   return (
//     <div className="space-y-6">
//       {/*Header*/}
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
//           <h1 className="text-3xl font-bold text-orange-100">Register House</h1>
//           <p className="text-blue-100">Add a new house property to the system</p>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Total Houses</p>
//                 {loading ? (
//                   <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">{statistics.total_houses}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Occupied</p>
//                 {loading ? (
//                   <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">{statistics.occupied}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Vacant</p>
//                 {loading ? (
//                   <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">{statistics.vacant}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 {loading ? (
//                   <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">{statistics.this_month}</p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>House Registration</CardTitle>
//           <CardDescription>
//             Register a new house property with complete details including location and ownership information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddHouseForm onSuccess={handleHouseCreated} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddHouse;



import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';
import AddHouseForm from '../components/forms/AddHouseForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddHouse = () => {
  const [stats, setStats] = useState({
    totalHouses: 0,
    occupied: 0,
    vacant: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    window.history.back();
  };

  // ADD THIS FUNCTION HERE
  const fetchHouseStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/houses/stats');

      if (!response.ok) {
        throw new Error(`Failed to fetch house statistics: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStats({
          totalHouses: result.data.totalHouses || result.data.total || 0,
          occupied: result.data.occupied || result.data.occupiedCount || 0,
          vacant: result.data.vacant || result.data.vacantCount || 0,
          thisMonth: result.data.thisMonth || result.data.newThisMonth || 0
        });
      } else {
        throw new Error(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching house stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD THIS useEffect
  useEffect(() => {
    fetchHouseStats();
  }, []);

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
            <h1 className="text-3xl font-bold text-gray-900">Register House</h1>
            <p className="text-gray-600">Add a new house property to the system</p>
          </div>
        </div>

        {/* Refresh Button - ADD THIS */}
        <Button
          variant="outline"
          size="sm"
          onClick={fetchHouseStats}
          startIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </Button>
      </div>

      {/* Error Message - ADD THIS */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">
            <strong>Error loading statistics:</strong> {error}
          </p>
        </div>
      )}

      {/* Stats Overview - UPDATE THESE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Houses Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Houses</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatNumber(stats.totalHouses)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupied Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Occupied</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatNumber(stats.occupied)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vacant Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Vacant</p>
                {loading ? (
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-1">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatNumber(stats.vacant)}
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
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600" />
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

      {/* Form Section - ADD onHouseAdded prop */}
      <Card>
        <CardHeader>
          <CardTitle>House Registration</CardTitle>
          <CardDescription>
            Register a new house property with complete details including location and ownership information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddHouseForm onHouseAdded={fetchHouseStats} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddHouse;