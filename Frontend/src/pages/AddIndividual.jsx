// import React from 'react';

// import { User, ArrowLeft } from 'lucide-react';
// import AddIndividualForm from '../components/forms/AddIndividualForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const AddIndividual = () => {
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
//           <h1 className="text-3xl font-bold text-gray-200">Add Individual</h1>
//           <p className="text-gray-100">Register a new individual in the kebele system</p>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Total Individuals</p>
//                 <p className="text-xl font-bold text-gray-900">1,247</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 <p className="text-xl font-bold text-gray-900">47</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Week</p>
//                 <p className="text-xl font-bold text-gray-900">12</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Today</p>
//                 <p className="text-xl font-bold text-gray-900">3</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Individual Registration</CardTitle>
//           <CardDescription>
//             Fill in all required information to register a new individual. Fields marked with * are required.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddIndividualForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddIndividual;



// import React, { useState, useEffect } from 'react';
// import { User, ArrowLeft, RefreshCw } from 'lucide-react';
// import AddIndividualForm from '../components/forms/AddIndividualForm';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const AddIndividual = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     thisMonth: 0,
//     thisWeek: 0,
//     today: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleBack = () => {
//     window.history.back();
//   };

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('http://localhost:5000/api/individuals/stats');

//       if (!response.ok) {
//         throw new Error('Failed to fetch statistics');
//       }

//       const result = await response.json();

//       if (result.success) {
//         setStats(result.data);
//       } else {
//         throw new Error(result.message || 'Failed to load statistics');
//       }
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//       setError(err.message);
//       // Set default values if API fails
//       setStats({
//         total: 0,
//         thisMonth: 0,
//         thisWeek: 0,
//         today: 0
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   // Format numbers with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
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
//             <h1 className="text-3xl font-bold text-gray-200">Add Individual</h1>
//             <p className="text-gray-100">Register a new individual in the kebele system</p>
//           </div>
//         </div>

//         {/* Refresh Button */}
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={fetchStats}
//           startIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
//           disabled={loading}
//         >
//           {loading ? 'Refreshing...' : 'Refresh Stats'}
//         </Button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Total Individuals Card */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                   <User className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">Total Individuals</p>
//                   {loading ? (
//                     <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
//                   ) : error ? (
//                     <p className="text-sm text-red-600">Error</p>
//                   ) : (
//                     <p className="text-xl font-bold text-gray-900">
//                       {formatNumber(stats.total)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* This Month Card */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Month</p>
//                 {loading ? (
//                   <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
//                 ) : error ? (
//                   <p className="text-sm text-red-600">Error</p>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">
//                     {formatNumber(stats.thisMonth)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* This Week Card */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">This Week</p>
//                 {loading ? (
//                   <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
//                 ) : error ? (
//                   <p className="text-sm text-red-600">Error</p>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">
//                     {formatNumber(stats.thisWeek)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Today Card */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Today</p>
//                 {loading ? (
//                   <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
//                 ) : error ? (
//                   <p className="text-sm text-red-600">Error</p>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-900">
//                     {formatNumber(stats.today)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//           <p className="text-red-800 text-sm">
//             <strong>Error loading statistics:</strong> {error}
//           </p>
//         </div>
//       )}
//       ~
//       {/* Form Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Individual Registration</CardTitle>
//           <CardDescription>
//             Fill in all required information to register a new individual. Fields marked with * are required.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <AddIndividualForm onIndividualAdded={fetchStats} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddIndividual;


import React, { useState, useEffect } from 'react';
import { User, ArrowLeft, RefreshCw } from 'lucide-react';
import AddIndividualForm from '../components/forms/AddIndividualForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddIndividual = () => {
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0
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
      
      const response = await fetch('http://localhost:5000/api/individuals/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
      // Set default values if API fails
      setStats({
        total: 0,
        thisMonth: 0,
        thisWeek: 0,
        today: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format numbers with commas
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
            <h1 className="text-3xl font-bold text-gray-200">Add Individual</h1>
            <p className="text-gray-100">Register a new individual in the kebele system</p>
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Individuals Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Individuals</p>
                  {loading ? (
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                  ) : error ? (
                    <p className="text-sm text-red-600">Error</p>
                  ) : (
                    <p className="text-xl font-bold text-gray-900">
                      {formatNumber(stats.total)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* This Month Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                {loading ? (
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                ) : error ? (
                  <p className="text-sm text-red-600">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(stats.thisMonth)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* This Week Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Week</p>
                {loading ? (
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                ) : error ? (
                  <p className="text-sm text-red-600">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(stats.thisWeek)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Today Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Today</p>
                {loading ? (
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                ) : error ? (
                  <p className="text-sm text-red-600">Error</p>
                ) : (
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(stats.today)}
                  </p>
                )}
              </div>
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
        </div>
      )}

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Registration</CardTitle>
          <CardDescription>
            Fill in all required information to register a new individual. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddIndividualForm onIndividualAdded={fetchStats} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIndividual;