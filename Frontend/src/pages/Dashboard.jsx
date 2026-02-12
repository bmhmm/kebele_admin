// import React, { useState, useEffect } from 'react';
// import {
//   Users,
//   Home,
//   IdCard,
//   Building,
//   UserPlus,
//   Search,
//   TrendingUp,
//   Calendar,
//   Download,
//   Bell,
//   Activity,
//   Eye,
//   Filter,
//   RefreshCw,
//   Settings,
//   BarChart3,
//   Shield,
//   Database,
//   Cpu,
//   HardDrive,
//   UserCheck
// } from 'lucide-react';
// import StatsCards from '../components/charts/StatsCards';
// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';

// const Dashboard = () => {
//   const [timeframe, setTimeframe] = useState('week');
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Simulate data loading
//     const loadData = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setLoading(false);

//       // Mock recent activity
//       setRecentActivity([
//         {
//           id: 1,
//           type: 'individual_added',
//           title: 'New Individual Registered',
//           description: 'John Doe was added to the system',
//           time: '2 minutes ago',
//           icon: UserPlus,
//           color: 'emerald',
//           status: 'completed'
//         },
//         {
//           id: 2,
//           type: 'family_registered',
//           title: 'New Family Registered',
//           description: 'Smith family with 4 members',
//           time: '1 hour ago',
//           icon: Users,
//           color: 'blue',
//           status: 'completed'
//         },
//         {
//           id: 3,
//           type: 'id_card_issued',
//           title: 'ID Card Issued',
//           description: 'ID card for Jane Smith',
//           time: '3 hours ago',
//           icon: IdCard,
//           color: 'violet',
//           status: 'completed'
//         },
//         {
//           id: 4,
//           type: 'house_registered',
//           title: 'House Registered',
//           description: 'New house at Zone 2',
//           time: '5 hours ago',
//           icon: Home,
//           color: 'amber',
//           status: 'completed'
//         }
//       ]);

//       // Mock notifications
//       setNotifications([
//         {
//           id: 1,
//           type: 'system_update',
//           title: 'System Update Available',
//           description: 'New features and security patches',
//           time: '2 hours ago',
//           icon: Settings,
//           color: 'blue',
//           priority: 'medium'
//         },
//         {
//           id: 2,
//           type: 'backup_complete',
//           title: 'Backup Completed',
//           description: 'Daily backup completed successfully',
//           time: '4 hours ago',
//           icon: Shield,
//           color: 'emerald',
//           priority: 'low'
//         },
//         {
//           id: 3,
//           type: 'security_alert',
//           title: 'Security Alert',
//           description: 'Unusual login activity detected',
//           time: '6 hours ago',
//           icon: Activity,
//           color: 'rose',
//           priority: 'high'
//         }
//       ]);
//     };

//     loadData();
//   }, []);

//   const quickActions = [
//     {
//       title: 'Add Individual',
//       description: 'Register new person',
//       icon: UserPlus,
//       color: 'from-blue-500 to-cyan-500',
//       hoverColor: 'from-blue-600 to-cyan-600',
//       iconColor: 'text-blue-600',
//       href: '/add-individual'
//     },
//     {
//       title: 'Register Family',
//       description: 'Add new family',
//       icon: Users,
//       color: 'from-emerald-500 to-green-500',
//       hoverColor: 'from-emerald-600 to-green-600',
//       iconColor: 'text-emerald-600',
//       href: '/add-family'
//     },
//     {
//       title: 'Add House',
//       description: 'Register property',
//       icon: Home,
//       color: 'from-violet-500 to-purple-500',
//       hoverColor: 'from-violet-600 to-purple-600',
//       iconColor: 'text-violet-600',
//       href: '/add-house'
//     },
//     {
//       title: 'Issue ID Card',
//       description: 'Create identification',
//       icon: IdCard,
//       color: 'from-amber-500 to-orange-500',
//       hoverColor: 'from-amber-600 to-orange-600',
//       iconColor: 'text-amber-600',
//       href: '/add-id-card'
//     },
//     // {
//     //   title: 'Search Records',
//     //   description: 'Find information',
//     //   icon: Search,
//     //   color: 'from-indigo-500 to-blue-500',
//     //   hoverColor: 'from-indigo-600 to-blue-600',
//     //   iconColor: 'text-indigo-600',
//     //   href: '/search'
//     // },
//     // {
//     //   title: 'View Reports',
//     //   description: 'Analytics & insights',
//     //   icon: BarChart3,
//     //   color: 'from-rose-500 to-pink-500',
//     //   hoverColor: 'from-rose-600 to-pink-600',
//     //   iconColor: 'text-rose-600',
//     //   href: '/reports'
//     // }
//   ];

//   const systemMetrics = [
//     {
//       label: 'Database Usage',
//       value: '65%',
//       color: 'blue',
//       icon: Database,
//       description: 'Storage capacity used'
//     },
//     {
//       label: 'Server Load',
//       value: '42%',
//       color: 'emerald',
//       icon: Cpu,
//       description: 'Current CPU utilization'
//     },
//     {
//       label: 'Storage Space',
//       value: '78%',
//       color: 'amber',
//       icon: HardDrive,
//       description: 'Disk space remaining'
//     },
//     {
//       label: 'Active Users',
//       value: '24',
//       color: 'violet',
//       icon: UserCheck,
//       description: 'Currently online'
//     }
//   ];

//   // Button handlers
//   const handleExport = () => {
//     console.log('Exporting dashboard data...');
//     // Implement export functionality
//     alert('Export functionality triggered! Data will be downloaded shortly.');
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       console.log('Dashboard data refreshed!');
//     }, 1000);
//   };

//   const handleViewAllActivities = () => {
//     console.log('Navigating to activities page...');
//     // Navigate to activities page
//   };

//   const handleViewAllNotifications = () => {
//     console.log('Navigating to notifications page...');
//     // Navigate to notifications page
//   };

//   const handleSystemSettings = () => {
//     console.log('Opening system settings...');
//     // Open system settings
//   };

//   const handleQuickAction = (action) => {
//     console.log(`Quick action triggered: ${action.title}`);
//     // Navigate to the respective page
//     window.location.href = action.href;
//   };

//   const handleTimeframeChange = (newTimeframe) => {
//     setTimeframe(newTimeframe);
//     console.log(`Timeframe changed to: ${newTimeframe}`);
//   };

//   const handleViewDetails = (item, type) => {
//     console.log(`Viewing details for ${type}:`, item);
//     // Show detailed view
//   };

//   const handleDismissNotification = (notificationId) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
//     console.log(`Notification ${notificationId} dismissed`);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section with Enhanced Design */}
//       <div className="bg-gradient-to-br from-orange-900 via-black to-orange-900 rounded-3xl p-8 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
//         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

//         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex-1">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-black to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Building className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
//                   Welcome back, Admin! 👋
//                 </h1>
//                 <p className="text-orange-100 text-lg mt-2">
//                   Here's what's happening with your kebele administration today.
//                 </p>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex flex-wrap gap-4 mt-6">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
//                 <div className="text-white text-sm">Today's Registrations</div>
//                 <div className="text-white font-semibold">12</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
//                 <div className="text-white text-sm">Pending Tasks</div>
//                 <div className="text-white font-semibold">8</div>
//               </div>
//               {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
//                 <div className="text-white text-sm">System Uptime</div>
//                 <div className="text-white font-semibold">99.9%</div>
//               </div> */}
//             </div>
//           </div>

//           <div className="mt-6 lg:mt-0 flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
//               <Calendar className="w-5 h-5 text-orange-200" />
//               <span className="text-white font-medium">
//                 {new Date().toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-2">
//               <Button
//                 onClick={handleRefresh}
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white border-white/20"
//                 startIcon={<RefreshCw className="w-4 h-4" />}
//               >
//                 Refresh
//               </Button>
//               <Button
//                 onClick={handleSystemSettings}
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white border-white/20"
//                 startIcon={<Settings className="w-4 h-4" />}
//               >
//                 Settings
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview with Enhanced Cards */}
//       <StatsCards
//         loading={loading}
//         timeframe={timeframe}
//         onTimeframeChange={handleTimeframeChange}
//         onExport={handleExport}
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Quick Actions - Enhanced */}
//         <div className="lg:col-span-2">
//           <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
//             <CardHeader className="pb-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
//                   <CardDescription className="text-gray-600">
//                     Frequently used tasks and operations
//                   </CardDescription>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   startIcon={<Filter className="w-4 h-4" />}
//                   className="border-gray-300 hover:border-gray-400"
//                 >
//                   Filter
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {quickActions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleQuickAction(action)}
//                     className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
//                   >
//                     {/* Content */}
//                     <div className="relative z-10">
//                       <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-100`}>
//                         <action.icon className={`w-7 h-7 ${action.iconColor} transition-colors duration-300`} />
//                       </div>
//                       <h3 className="font-semibold text-gray-900 transition-colors duration-300 mb-2 text-lg">
//                         {action.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 transition-colors duration-300 leading-relaxed">
//                         {action.description}
//                       </p>
//                     </div>

//                     {/* Hover Arrow */}
//                     <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
//                       <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center">
//                         <div className="w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 -translate-x-0.5 -translate-y-0.5" />
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>


//       </div>


//     </div>
//   );
// };

// export default Dashboard;






// import React, { useState, useEffect } from 'react';
// import {
//   Users,
//   Home,
//   IdCard,
//   Building,
//   UserPlus,
//   Search,
//   TrendingUp,
//   Calendar,
//   Download,
//   Bell,
//   Activity,
//   Eye,
//   Filter,
//   RefreshCw,
//   Settings,
//   BarChart3,
//   Shield,
//   Database,
//   Cpu,
//   HardDrive,
//   UserCheck
// } from 'lucide-react';
// import StatsCards from '../components/charts/StatsCards';
// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { dashboardService } from '../services/dashBoardService'; // Add this import
// import { toast } from 'react-hot-toast'; // Add this import

// const Dashboard = () => {
//   // const [timeframe, setTimeframe] = useState('week');
//   const [loading, setLoading] = useState(true);
//   const [dashboardStats, setDashboardStats] = useState({
//     today_registrations: 0,
//     pending_tasks: 0,
//     total_individuals: 0,
//     total_families: 0,
//     total_houses: 0,
//     total_id_cards: 0,
//     individuals_change: 0,
//     families_change: 0,
//     houses_change: 0,
//     id_cards_change: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//     loadMockActivities(); // Keep your mock activities
//   }, []);

//   // In your Dashboard.jsx, update the fetchDashboardData function:
//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching dashboard data...');
//       const response = await dashboardService.getStatistics();
//       console.log('API Response:', response);

//       if (response.success) {
//         console.log('Setting dashboard stats:', response.data);
//         setDashboardStats(response.data);
//       } else {
//         console.error('API returned error:', response);
//         toast.error('Failed to load dashboard statistics');
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMockActivities = async () => {
//     // Keep your existing mock activity data loading
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     setRecentActivity([
//       {
//         id: 1,
//         type: 'individual_added',
//         title: 'New Individual Registered',
//         description: 'John Doe was added to the system',
//         time: '2 minutes ago',
//         icon: UserPlus,
//         color: 'emerald',
//         status: 'completed'
//       },
//       {
//         id: 2,
//         type: 'family_registered',
//         title: 'New Family Registered',
//         description: 'Smith family with 4 members',
//         time: '1 hour ago',
//         icon: Users,
//         color: 'blue',
//         status: 'completed'
//       },
//       {
//         id: 3,
//         type: 'id_card_issued',
//         title: 'ID Card Issued',
//         description: 'ID card for Jane Smith',
//         time: '3 hours ago',
//         icon: IdCard,
//         color: 'violet',
//         status: 'completed'
//       },
//       {
//         id: 4,
//         type: 'house_registered',
//         title: 'House Registered',
//         description: 'New house at Zone 2',
//         time: '5 hours ago',
//         icon: Home,
//         color: 'amber',
//         status: 'completed'
//       }
//     ]);

//     // Mock notifications
//     setNotifications([
//       {
//         id: 1,
//         type: 'system_update',
//         title: 'System Update Available',
//         description: 'New features and security patches',
//         time: '2 hours ago',
//         icon: Settings,
//         color: 'blue',
//         priority: 'medium'
//       },
//       {
//         id: 2,
//         type: 'backup_complete',
//         title: 'Backup Completed',
//         description: 'Daily backup completed successfully',
//         time: '4 hours ago',
//         icon: Shield,
//         color: 'emerald',
//         priority: 'low'
//       },
//       {
//         id: 3,
//         type: 'security_alert',
//         title: 'Security Alert',
//         description: 'Unusual login activity detected',
//         time: '6 hours ago',
//         icon: Activity,
//         color: 'rose',
//         priority: 'high'
//       }
//     ]);
//   };

//   const quickActions = [
//     {
//       title: 'Add Individual',
//       description: 'Register new person',
//       icon: UserPlus,
//       color: 'from-blue-500 to-cyan-500',
//       hoverColor: 'from-blue-600 to-cyan-600',
//       iconColor: 'text-blue-600',
//       href: '/add-individual'
//     },
//     {
//       title: 'Register Family',
//       description: 'Add new family',
//       icon: Users,
//       color: 'from-emerald-500 to-green-500',
//       hoverColor: 'from-emerald-600 to-green-600',
//       iconColor: 'text-emerald-600',
//       href: '/add-family'
//     },
//     {
//       title: 'Add House',
//       description: 'Register property',
//       icon: Home,
//       color: 'from-violet-500 to-purple-500',
//       hoverColor: 'from-violet-600 to-purple-600',
//       iconColor: 'text-violet-600',
//       href: '/add-house'
//     },
//     {
//       title: 'Issue ID Card',
//       description: 'Create identification',
//       icon: IdCard,
//       color: 'from-amber-500 to-orange-500',
//       hoverColor: 'from-amber-600 to-orange-600',
//       iconColor: 'text-amber-600',
//       href: '/add-id-card'
//     },
//   ];

//   const systemMetrics = [
//     {
//       label: 'Database Usage',
//       value: '65%',
//       color: 'blue',
//       icon: Database,
//       description: 'Storage capacity used'
//     },
//     {
//       label: 'Server Load',
//       value: '42%',
//       color: 'emerald',
//       icon: Cpu,
//       description: 'Current CPU utilization'
//     },
//     {
//       label: 'Storage Space',
//       value: '78%',
//       color: 'amber',
//       icon: HardDrive,
//       description: 'Disk space remaining'
//     },
//     {
//       label: 'Active Users',
//       value: '24',
//       color: 'violet',
//       icon: UserCheck,
//       description: 'Currently online'
//     }
//   ];

//   // Button handlers - update handleRefresh
//   const handleExport = () => {
//     console.log('Exporting dashboard data...');
//     alert('Export functionality triggered! Data will be downloaded shortly.');
//   };

//   const handleRefresh = () => {
//     fetchDashboardData();
//     toast.success('Dashboard data refreshed!');
//   };

//   const handleViewAllActivities = () => {
//     console.log('Navigating to activities page...');
//   };

//   const handleViewAllNotifications = () => {
//     console.log('Navigating to notifications page...');
//   };

//   const handleSystemSettings = () => {
//     window.location.href = './individuals';
//     console.log('Opening system settings...');
//   };

//   const handleQuickAction = (action) => {
//     console.log(`Quick action triggered: ${action.title}`);
//     window.location.href = action.href;
//   };

//   // const handleTimeframeChange = (newTimeframe) => {
//   //   setTimeframe(newTimeframe);
//   //   console.log(`Timeframe changed to: ${newTimeframe}`);
//   // };

//   const handleViewDetails = (item, type) => {
//     console.log(`Viewing details for ${type}:`, item);
//   };

//   const handleDismissNotification = (notificationId) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
//     console.log(`Notification ${notificationId} dismissed`);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section with Enhanced Design - UPDATED WITH REAL DATA */}
//       <div className="bg-gradient-to-br from-orange-900 via-black to-orange-900 rounded-3xl p-8 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
//         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

//         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex-1">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-black to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Building className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
//                   Welcome back, Admin! 👋
//                 </h1>
//                 <p className="text-orange-100 text-lg mt-2">
//                   Here's what's happening with your kebele administration today.
//                 </p>
//               </div>
//             </div>

//             {/* Quick Stats - UPDATED WITH REAL DATA */}
//             {/* <div className="flex flex-wrap gap-4 mt-6">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
//                 <div className="text-white text-sm">Today's Registrations</div>
//                 <div className="text-white font-semibold text-xl">
//                   {loading ? '...' : dashboardStats.today_registrations}
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
//                 <div className="text-white text-sm">Pending Tasks</div>
//                 <div className="text-white font-semibold text-xl">
//                   {loading ? '...' : dashboardStats.pending_tasks}
//                 </div>
//               </div>
//             </div> */}
//           </div>

//           <div className="mt-6 lg:mt-0 flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
//               <Calendar className="w-5 h-5 text-orange-200" />
//               <span className="text-white font-medium">
//                 {new Date().toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-2">
//               <Button
//                 onClick={handleRefresh}
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white border-white/20"
//                 startIcon={<RefreshCw className="w-4 h-4" />}
//                 disabled={loading}
//               >
//                 {loading ? 'Refreshing...' : 'Refresh'}
//               </Button>
//               <Button
//                 onClick={handleSystemSettings}
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white border-white/20"
//                 startIcon={<Settings className="w-4 h-4" />}
//               >
//                 Settings
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview with Enhanced Cards - UPDATED WITH REAL DATA */}


//       <StatsCards
//         loading={loading}
//         // timeframe={timeframe}
//         // onTimeframeChange={handleTimeframeChange}
//         onExport={handleExport}
//         statsData={{
//           individuals: {
//             value: loading ? '...' : dashboardStats.total_individuals.toLocaleString(),
//             change: loading ? '...' : `${dashboardStats.individuals_change}%`,
//             label: 'Total Individuals'
//           },
//           families: {
//             value: loading ? '...' : dashboardStats.total_families.toLocaleString(),
//             change: loading ? '...' : `${dashboardStats.families_change}%`,
//             label: 'Registered Families'
//           },
//           houses: {
//             value: loading ? '...' : dashboardStats.total_houses.toLocaleString(),
//             change: loading ? '...' : `${dashboardStats.houses_change}%`,
//             label: 'Houses Registered'
//           },
//           idCards: {
//             value: loading ? '...' : dashboardStats.total_id_cards.toLocaleString(),
//             change: loading ? '...' : `${dashboardStats.id_cards_change}%`,
//             label: 'ID Cards Issued'
//           }
//           // REMOVED: newRegistrations and activeThisWeek
//         }}
//       />

//       {/* Quick Actions - KEPT EXACTLY AS IS */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
//             <CardHeader className="pb-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
//                   <CardDescription className="text-gray-600">
//                     Frequently used tasks and operations
//                   </CardDescription>
//                 </div>
//                 {/* <Button
//                   variant="outline"
//                   size="sm"
//                   startIcon={<Filter className="w-4 h-4" />}
//                   className="border-gray-300 hover:border-gray-400"
//                 >
//                   Filter
//                 </Button> */}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {quickActions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleQuickAction(action)}
//                     className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
//                   >
//                     <div className="relative z-10">
//                       <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-100`}>
//                         <action.icon className={`w-7 h-7 ${action.iconColor} transition-colors duration-300`} />
//                       </div>
//                       <h3 className="font-semibold text-gray-900 transition-colors duration-300 mb-2 text-lg">
//                         {action.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 transition-colors duration-300 leading-relaxed">
//                         {action.description}
//                       </p>
//                     </div>
//                     <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
//                       <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center">
//                         <div className="w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 -translate-x-0.5 -translate-y-0.5" />
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





















import React, { useState, useEffect } from 'react';
import {
  Users,
  Home,
  IdCard,
  Building,
  UserPlus,
  Search,
  TrendingUp,
  Calendar,
  Download,
  Bell,
  Activity,
  Eye,
  Filter,
  RefreshCw,
  Settings,
  BarChart3,
  Shield,
  Database,
  Cpu,
  HardDrive,
  UserCheck,
  FileEdit,
  Eye as EyeIcon,
  FileText,
  Edit
} from 'lucide-react';
import StatsCards from '../components/charts/StatsCards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { dashboardService } from '../services/dashBoardService';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext'; // Add this import
import { useNavigate } from 'react-router-dom'; // Add this import

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    today_registrations: 0,
    pending_tasks: 0,
    total_individuals: 0,
    total_families: 0,
    total_houses: 0,
    total_id_cards: 0,
    individuals_change: 0,
    families_change: 0,
    houses_change: 0,
    id_cards_change: 0
  });

  const { user } = useAuth(); // Get current user
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      console.log('Fetching dashboard data...');
      const response = await dashboardService.getStatistics();
      console.log('API Response:', response);

      if (response.success) {
        console.log('Setting dashboard stats:', response.data);
        setDashboardStats(response.data);
      } else {
        console.error('API returned error:', response);
        toast.error('Failed to load dashboard statistics');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Different quick actions based on role
  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'View Individuals',
        description: 'Browse all registered citizens',
        icon: Users,
        color: 'from-blue-500 to-cyan-500',
        hoverColor: 'from-blue-600 to-cyan-600',
        iconColor: 'text-blue-600',
        href: '/list-individuals',
        roles: ['Administrator', 'Data Entry Clerk', 'View Only']
      },
      {
        title: 'View Families',
        description: 'Browse family households',
        icon: Users,
        color: 'from-emerald-500 to-green-500',
        hoverColor: 'from-emerald-600 to-green-600',
        iconColor: 'text-emerald-600',
        href: '/list-families',
        roles: ['Administrator', 'Data Entry Clerk', 'View Only']
      },
      {
        title: 'View Houses',
        description: 'Browse residential properties',
        icon: Home,
        color: 'from-violet-500 to-purple-500',
        hoverColor: 'from-violet-600 to-purple-600',
        iconColor: 'text-violet-600',
        href: '/list-houses',
        roles: ['Administrator', 'Data Entry Clerk', 'View Only']
      },
      {
        title: 'View ID Cards',
        description: 'Browse issued identification',
        icon: IdCard,
        color: 'from-amber-500 to-orange-500',
        hoverColor: 'from-amber-600 to-orange-600',
        iconColor: 'text-amber-600',
        href: '/list-id-cards',
        roles: ['Administrator', 'Data Entry Clerk', 'View Only']
      }
    ];

    // Additional actions for Admin and Data Entry
    const editActions = [
      {
        title: 'Add Individual',
        description: 'Register new person',
        icon: UserPlus,
        color: 'from-blue-500 to-cyan-500',
        hoverColor: 'from-blue-600 to-cyan-600',
        iconColor: 'text-blue-600',
        href: '/add-individual',
        roles: ['Administrator', 'Data Entry Clerk']
      },
      {
        title: 'Register Family',
        description: 'Add new family',
        icon: Users,
        color: 'from-emerald-500 to-green-500',
        hoverColor: 'from-emerald-600 to-green-600',
        iconColor: 'text-emerald-600',
        href: '/add-family',
        roles: ['Administrator', 'Data Entry Clerk']
      },
      {
        title: 'Add House',
        description: 'Register property',
        icon: Home,
        color: 'from-violet-500 to-purple-500',
        hoverColor: 'from-violet-600 to-purple-600',
        iconColor: 'text-violet-600',
        href: '/add-house',
        roles: ['Administrator', 'Data Entry Clerk']
      },
      {
        title: 'Issue ID Card',
        description: 'Create identification',
        icon: IdCard,
        color: 'from-amber-500 to-orange-500',
        hoverColor: 'from-amber-600 to-orange-600',
        iconColor: 'text-amber-600',
        href: '/add-id-card',
        roles: ['Administrator', 'Data Entry Clerk']
      }
    ];

    // Admin only actions
    const adminActions = [
      {
        title: 'System Settings',
        description: 'Configure system settings',
        icon: Settings,
        color: 'from-purple-500 to-pink-500',
        hoverColor: 'from-purple-600 to-pink-600',
        iconColor: 'text-purple-600',
        href: '/settings',
        roles: ['Administrator']
      },
      {
        title: 'Edit Records',
        description: 'Update existing information',
        icon: Edit,
        color: 'from-cyan-500 to-teal-500',
        hoverColor: 'from-cyan-600 to-teal-600',
        iconColor: 'text-cyan-600',
        href: '/list-individuals',
        roles: ['Administrator', 'Data Entry Clerk']
      }
    ];

    // Combine actions based on user role
    let actions = [...baseActions];

    if (user?.role === 'Administrator' || user?.role === 'Data Entry Clerk') {
      actions = [...actions, ...editActions];
    }

    if (user?.role === 'Administrator') {
      actions = [...actions, ...adminActions];
    }

    // Filter actions to only show those allowed for current user
    return actions.filter(action => action.roles.includes(user?.role || 'View Only'));
  };

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'Administrator':
        return {
          title: 'Welcome back, Administrator! 👑',
          subtitle: 'Full system access and control',
          badge: 'Full System Access',
          badgeColor: 'from-purple-900/40 to-purple-700/40'
        };
      case 'Data Entry Clerk':
        return {
          title: 'Welcome back, Data Entry Clerk! 📝',
          subtitle: 'Manage citizen data and registrations',
          badge: 'Data Management Access',
          badgeColor: 'from-blue-900/40 to-blue-700/40'
        };
      case 'View Only':
        return {
          title: 'Welcome back, Viewer! 👁️',
          subtitle: 'Read-only access to system data',
          badge: 'Read-Only Access',
          badgeColor: 'from-gray-900/40 to-gray-700/40'
        };
      default:
        return {
          title: 'Welcome back! 👋',
          subtitle: 'Kebele administration system',
          badge: 'User',
          badgeColor: 'from-orange-900/40 to-orange-700/40'
        };
    }
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'Administrator':
        return Shield;
      case 'Data Entry Clerk':
        return FileEdit;
      case 'View Only':
        return EyeIcon;
      default:
        return Building;
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action.title}`);
    navigate(action.href);
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast.success('Dashboard data refreshed!');
  };

  const handleSystemSettings = () => {
    if (user?.role === 'Administrator') {
      navigate('/settings');
    } else {
      toast.error('Access denied. Admin privileges required.');
    }
  };

  const welcome = getWelcomeMessage();
  const RoleIcon = getRoleIcon();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-8">
      {/* Welcome Section with Role-Based Content */}
      <div className="bg-gradient-to-br from-orange-900 via-black to-orange-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-black to-orange-700 rounded-2xl flex items-center justify-center shadow-lg`}>
                <RoleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                  {welcome.title}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-orange-100 text-lg">
                    {welcome.subtitle}
                  </p>
                  <span className={`px-3 py-1 ${welcome.badgeColor} text-orange-200 text-sm rounded-full border border-orange-500/30`}>
                    {welcome.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Total Individuals</div>
                <div className="text-white font-semibold text-xl">
                  {loading ? '...' : dashboardStats.total_individuals.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Total Families</div>
                <div className="text-white font-semibold text-xl">
                  {loading ? '...' : dashboardStats.total_families.toLocaleString()}
                </div>
              </div>
              {user?.role !== 'View Only' && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                  <div className="text-white text-sm">Today's Registrations</div>
                  <div className="text-white font-semibold text-xl">
                    {loading ? '...' : dashboardStats.today_registrations}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
              <Calendar className="w-5 h-5 text-orange-200" />
              <span className="text-white font-medium">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">

              {/* here is the LOGOUT button starts */}
              <Button
                onClick={() => {
                  // Add your logout logic here
                  // Clear auth state/tokens
                  window.location.href = 'http://localhost:5173/login';
                }}
                className="bg-yellow-400 hover:bg-yellow-400/80 text-black font-medium px-4 py-2 rounded-lg 
               transition-all duration-300 hover:backdrop-blur-sm border-0 shadow-md 
               hover:shadow-lg hover:shadow-yellow-200/40"
                size="sm"
              >
                Logout
              </Button>
              {/* LOGOUT button ends here */}

              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                startIcon={<RefreshCw className="w-4 h-4" />}
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              {user?.role === 'Administrator' && (
                <Button
                  onClick={handleSystemSettings}
                  variant="ghost"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  startIcon={<Settings className="w-4 h-4" />}
                >
                  Settings
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsCards
        loading={loading}
        statsData={{
          individuals: {
            value: loading ? '...' : dashboardStats.total_individuals.toLocaleString(),
            change: loading ? '...' : `${dashboardStats.individuals_change}%`,
            label: 'Total Individuals'
          },
          families: {
            value: loading ? '...' : dashboardStats.total_families.toLocaleString(),
            change: loading ? '...' : `${dashboardStats.families_change}%`,
            label: 'Registered Families'
          },
          houses: {
            value: loading ? '...' : dashboardStats.total_houses.toLocaleString(),
            change: loading ? '...' : `${dashboardStats.houses_change}%`,
            label: 'Houses Registered'
          },
          idCards: {
            value: loading ? '...' : dashboardStats.total_id_cards.toLocaleString(),
            change: loading ? '...' : `${dashboardStats.id_cards_change}%`,
            label: 'ID Cards Issued'
          }
        }}
      />

      {/* Role-Based Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {user?.role === 'Administrator' ? 'Admin Actions' :
                      user?.role === 'Data Entry Clerk' ? 'Data Entry Tasks' :
                        'Browse Data'}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {user?.role === 'Administrator' ? 'Full system control and management' :
                      user?.role === 'Data Entry Clerk' ? 'Register and manage citizen data' :
                        'View and analyze system information'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    <div className="relative z-10">
                      <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-100`}>
                        <action.icon className={`w-7 h-7 ${action.iconColor} transition-colors duration-300`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 transition-colors duration-300 mb-2 text-lg">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 -translate-x-0.5 -translate-y-0.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Role-Specific Information Section */}
      {user?.role === 'Administrator' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Admin Features
            </CardTitle>
            <CardDescription>
              System administration and user management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-2">User Management</h4>
                <p className="text-gray-600 text-sm mb-3">Manage system users and permissions</p>
                <Button onClick={() => navigate('/settings?tab=user')} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Manage Users
                </Button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-2">System Audit</h4>
                <p className="text-gray-600 text-sm mb-3">View system logs and activity</p>
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-700">
                  View Audit Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user?.role === 'Data Entry Clerk' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileEdit className="w-6 h-6 text-blue-600" />
              Data Entry Statistics
            </CardTitle>
            <CardDescription>
              Your data entry performance and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-xl border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-700">{dashboardStats.today_registrations}</div>
                <div className="text-sm text-gray-600">Today's Entries</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-700">{dashboardStats.pending_tasks}</div>
                <div className="text-sm text-gray-600">Pending Tasks</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-700">98.5%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-700">4.2 min</div>
                <div className="text-sm text-gray-600">Avg. Time/Record</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user?.role === 'View Only' && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <EyeIcon className="w-6 h-6 text-gray-600" />
              Viewing Information
            </CardTitle>
            <CardDescription>
              Read-only access to kebele administration data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">View Only Notice</h4>
                  <p className="text-gray-600 text-sm">
                    Your role has read-only permissions. You can view all data, generate reports,
                    and analyze statistics, but cannot add, edit, or delete any records.
                    Contact an administrator if you need editing privileges.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;