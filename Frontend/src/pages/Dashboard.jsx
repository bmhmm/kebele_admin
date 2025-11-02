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

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      
      // Mock recent activity
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

    loadData();
  }, []);

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
    {
      title: 'Search Records',
      description: 'Find information',
      icon: Search,
      color: 'from-indigo-500 to-blue-500',
      hoverColor: 'from-indigo-600 to-blue-600',
      iconColor: 'text-indigo-600',
      href: '/search'
    },
    {
      title: 'View Reports',
      description: 'Analytics & insights',
      icon: BarChart3,
      color: 'from-rose-500 to-pink-500',
      hoverColor: 'from-rose-600 to-pink-600',
      iconColor: 'text-rose-600',
      href: '/reports'
    }
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

  // Button handlers
  const handleExport = () => {
    console.log('Exporting dashboard data...');
    // Implement export functionality
    alert('Export functionality triggered! Data will be downloaded shortly.');
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Dashboard data refreshed!');
    }, 1000);
  };

  const handleViewAllActivities = () => {
    console.log('Navigating to activities page...');
    // Navigate to activities page
  };

  const handleViewAllNotifications = () => {
    console.log('Navigating to notifications page...');
    // Navigate to notifications page
  };

  const handleSystemSettings = () => {
    console.log('Opening system settings...');
    // Open system settings
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action.title}`);
    // Navigate to the respective page
    window.location.href = action.href;
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    console.log(`Timeframe changed to: ${newTimeframe}`);
  };

  const handleViewDetails = (item, type) => {
    console.log(`Viewing details for ${type}:`, item);
    // Show detailed view
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    console.log(`Notification ${notificationId} dismissed`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section with Enhanced Design */}
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
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Today's Registrations</div>
                <div className="text-white font-semibold">12</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">Pending Tasks</div>
                <div className="text-white font-semibold">8</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className="text-white text-sm">System Uptime</div>
                <div className="text-white font-semibold">99.9%</div>
              </div>
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
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                startIcon={<RefreshCw className="w-4 h-4" />}
              >
                Refresh
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

      {/* Stats Overview with Enhanced Cards */}
      <StatsCards
        loading={loading}
        timeframe={timeframe}
        onTimeframeChange={handleTimeframeChange}
        onExport={handleExport}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions - Enhanced */}
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
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<Filter className="w-4 h-4" />}
                  className="border-gray-300 hover:border-gray-400"
                >
                  Filter
                </Button>
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
                    {/* Content */}
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
                    
                    {/* Hover Arrow */}
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

        {/* Recent Activity - Enhanced */}
        <div>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-600">
                    Latest system activities
                  </CardDescription>
                </div>
                <Button
                  onClick={handleViewAllActivities}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-gray-400 text-gray-700"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    onClick={() => handleViewDetails(activity, 'activity')}
                    className="group flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-${activity.color}-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <activity.icon className={`w-6 h-6 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {activity.title}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${activity.color}-100 text-${activity.color}-800`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status & Notifications - Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Performance - Enhanced */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">System Performance</CardTitle>
                <CardDescription className="text-gray-600">
                  Current system health and metrics
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                startIcon={<Activity className="w-4 h-4" />}
                className="border-gray-300 hover:border-gray-400"
              >
                Monitor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${metric.color}-50 rounded-xl flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900 block">
                        {metric.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {metric.description}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold text-${metric.color}-600 block`}>
                      {metric.value}
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full bg-${metric.color}-500 rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: metric.value.includes('%') 
                            ? metric.value 
                            : '50%' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications - Enhanced */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Notifications</CardTitle>
                <CardDescription className="text-gray-600">
                  Important alerts and messages
                </CardDescription>
              </div>
              <Button
                onClick={handleViewAllNotifications}
                variant="outline"
                size="sm"
                className="border-gray-300 hover:border-gray-400 text-gray-700"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="group flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 relative"
                >
                  {/* Priority Indicator */}
                  <div className={`absolute top-4 left-4 w-2 h-2 rounded-full bg-${notification.color}-500`} />
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <notification.icon className={`w-4 h-4 text-${notification.color}-600`} />
                        <h4 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${notification.color}-100 text-${notification.color}-800 capitalize`}>
                        {notification.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {notification.time}
                      </p>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(notification, 'notification');
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-gray-600 hover:text-gray-900"
                          startIcon={<Eye className="w-3 h-3" />}
                        >
                          View
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismissNotification(notification.id);
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Action Buttons */}
      
      
          
        
      
    </div>
  );
};

export default Dashboard;