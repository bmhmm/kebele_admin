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
  UserCheck
} from 'lucide-react';
import StatsCards from '../components/charts/StatsCards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { dashboardService } from '../services/dashBoardService'; // Add this import
import { toast } from 'react-hot-toast'; // Add this import

const Dashboard = () => {
  // const [timeframe, setTimeframe] = useState('week');
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
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    loadMockActivities(); // Keep your mock activities
  }, []);

  // In your Dashboard.jsx, update the fetchDashboardData function:
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

  const loadMockActivities = async () => {
    // Keep your existing mock activity data loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    setRecentActivity([
      {
        id: 1,
        type: 'individual_added',
        title: 'New Individual Registered',
        description: 'John Doe was added to the system',
        time: '2 minutes ago',
        icon: UserPlus,
        color: 'emerald',
        status: 'completed'
      },
      {
        id: 2,
        type: 'family_registered',
        title: 'New Family Registered',
        description: 'Smith family with 4 members',
        time: '1 hour ago',
        icon: Users,
        color: 'blue',
        status: 'completed'
      },
      {
        id: 3,
        type: 'id_card_issued',
        title: 'ID Card Issued',
        description: 'ID card for Jane Smith',
        time: '3 hours ago',
        icon: IdCard,
        color: 'violet',
        status: 'completed'
      },
      {
        id: 4,
        type: 'house_registered',
        title: 'House Registered',
        description: 'New house at Zone 2',
        time: '5 hours ago',
        icon: Home,
        color: 'amber',
        status: 'completed'
      }
    ]);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        type: 'system_update',
        title: 'System Update Available',
        description: 'New features and security patches',
        time: '2 hours ago',
        icon: Settings,
        color: 'blue',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'backup_complete',
        title: 'Backup Completed',
        description: 'Daily backup completed successfully',
        time: '4 hours ago',
        icon: Shield,
        color: 'emerald',
        priority: 'low'
      },
      {
        id: 3,
        type: 'security_alert',
        title: 'Security Alert',
        description: 'Unusual login activity detected',
        time: '6 hours ago',
        icon: Activity,
        color: 'rose',
        priority: 'high'
      }
    ]);
  };

  const quickActions = [
    {
      title: 'Add Individual',
      description: 'Register new person',
      icon: UserPlus,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'from-blue-600 to-cyan-600',
      iconColor: 'text-blue-600',
      href: '/add-individual'
    },
    {
      title: 'Register Family',
      description: 'Add new family',
      icon: Users,
      color: 'from-emerald-500 to-green-500',
      hoverColor: 'from-emerald-600 to-green-600',
      iconColor: 'text-emerald-600',
      href: '/add-family'
    },
    {
      title: 'Add House',
      description: 'Register property',
      icon: Home,
      color: 'from-violet-500 to-purple-500',
      hoverColor: 'from-violet-600 to-purple-600',
      iconColor: 'text-violet-600',
      href: '/add-house'
    },
    {
      title: 'Issue ID Card',
      description: 'Create identification',
      icon: IdCard,
      color: 'from-amber-500 to-orange-500',
      hoverColor: 'from-amber-600 to-orange-600',
      iconColor: 'text-amber-600',
      href: '/add-id-card'
    },
  ];

  const systemMetrics = [
    {
      label: 'Database Usage',
      value: '65%',
      color: 'blue',
      icon: Database,
      description: 'Storage capacity used'
    },
    {
      label: 'Server Load',
      value: '42%',
      color: 'emerald',
      icon: Cpu,
      description: 'Current CPU utilization'
    },
    {
      label: 'Storage Space',
      value: '78%',
      color: 'amber',
      icon: HardDrive,
      description: 'Disk space remaining'
    },
    {
      label: 'Active Users',
      value: '24',
      color: 'violet',
      icon: UserCheck,
      description: 'Currently online'
    }
  ];

  // Button handlers - update handleRefresh
  const handleExport = () => {
    console.log('Exporting dashboard data...');
    alert('Export functionality triggered! Data will be downloaded shortly.');
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast.success('Dashboard data refreshed!');
  };

  const handleViewAllActivities = () => {
    console.log('Navigating to activities page...');
  };

  const handleViewAllNotifications = () => {
    console.log('Navigating to notifications page...');
  };

  const handleSystemSettings = () => {
    window.location.href = '/settings';
    console.log('Opening system settings...');
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action.title}`);
    window.location.href = action.href;
  };

  // const handleTimeframeChange = (newTimeframe) => {
  //   setTimeframe(newTimeframe);
  //   console.log(`Timeframe changed to: ${newTimeframe}`);
  // };

  const handleViewDetails = (item, type) => {
    console.log(`Viewing details for ${type}:`, item);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    console.log(`Notification ${notificationId} dismissed`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section with Enhanced Design - UPDATED WITH REAL DATA */}
      <div className="bg-gradient-to-br from-orange-900 via-black to-orange-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                  Welcome back, Admin! 👋
                </h1>
                <p className="text-orange-100 text-lg mt-2">
                  Here's what's happening with your kebele administration today.
                </p>
              </div>
            </div>

            {/* Quick Stats - UPDATED WITH REAL DATA */}
            {/* <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Today's Registrations</div>
                <div className="text-white font-semibold text-xl">
                  {loading ? '...' : dashboardStats.today_registrations}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Pending Tasks</div>
                <div className="text-white font-semibold text-xl">
                  {loading ? '...' : dashboardStats.pending_tasks}
                </div>
              </div>
            </div> */}
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
              <Button
                onClick={handleSystemSettings}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                startIcon={<Settings className="w-4 h-4" />}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview with Enhanced Cards - UPDATED WITH REAL DATA */}


      <StatsCards
        loading={loading}
        // timeframe={timeframe}
        // onTimeframeChange={handleTimeframeChange}
        onExport={handleExport}
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
          // REMOVED: newRegistrations and activeThisWeek
        }}
      />

      {/* Quick Actions - KEPT EXACTLY AS IS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-600">
                    Frequently used tasks and operations
                  </CardDescription>
                </div>
                {/* <Button
                  variant="outline"
                  size="sm"
                  startIcon={<Filter className="w-4 h-4" />}
                  className="border-gray-300 hover:border-gray-400"
                >
                  Filter
                </Button> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default Dashboard;