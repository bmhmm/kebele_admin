import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Users, Settings, FileText, Activity, Database, Lock, Globe, Bell, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const adminFeatures = [
        {
            icon: <Users className="w-6 h-6" />,
            title: 'User Management',
            description: 'Manage all system users and permissions',
            action: () => navigate('/settings?tab=user'),
            color: 'from-purple-900/20 to-purple-700/10',
            borderColor: 'border-purple-500/30',
            textColor: 'text-purple-400'
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: 'System Settings',
            description: 'Configure kebele system settings',
            action: () => navigate('/settings'),
            color: 'from-blue-900/20 to-blue-700/10',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400'
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: 'Data Management',
            description: 'Manage all citizen and household data',
            action: () => navigate('/list-individuals'),
            color: 'from-emerald-900/20 to-emerald-700/10',
            borderColor: 'border-emerald-500/30',
            textColor: 'text-emerald-400'
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: 'Audit Logs',
            description: 'View system activity and user actions',
            action: () => alert('Audit logs coming soon!'),
            color: 'from-amber-900/20 to-amber-700/10',
            borderColor: 'border-amber-500/30',
            textColor: 'text-amber-400'
        },
        {
            icon: <Activity className="w-6 h-6" />,
            title: 'System Health',
            description: 'Monitor system performance and status',
            action: () => alert('System health dashboard coming soon!'),
            color: 'from-red-900/20 to-red-700/10',
            borderColor: 'border-red-500/30',
            textColor: 'text-red-400'
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: 'Security',
            description: 'Manage security settings and access controls',
            action: () => navigate('/settings?tab=security'),
            color: 'from-gray-900/20 to-gray-700/10',
            borderColor: 'border-gray-500/30',
            textColor: 'text-gray-400'
        }
    ];

    const quickStats = [
        { label: 'Total Users', value: '24', change: '+2' },
        { label: 'Active Sessions', value: '8', change: '' },
        { label: 'Today\'s Records', value: '15', change: '+3' },
        { label: 'Pending Tasks', value: '3', change: '-1' },
    ];

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/20 via-purple-800/15 to-transparent border border-purple-500/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Administrator Dashboard</h1>
                            <p className="text-purple-200 flex items-center gap-2">
                                <span>Welcome back,</span>
                                <span className="font-semibold text-white">{user?.name || 'Administrator'}</span>
                                <span className="px-2 py-0.5 bg-purple-900/40 text-purple-200 text-xs rounded-full">
                                    Full System Access
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => navigate('/settings')}
                            className="bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white"
                        >
                            <Settings className="w-4 h-4 mr-2" />
                            System Settings
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                    <Card key={index} className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-white">{stat.value}</span>
                                {stat.change && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-300">
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Admin Features Grid */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Admin Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminFeatures.map((feature, index) => (
                        <button
                            key={index}
                            onClick={feature.action}
                            className={`p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] text-left ${feature.color} ${feature.borderColor}`}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color.replace('/20', '/40').replace('/10', '/30')}`}>
                                <div className={feature.textColor}>
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className={`font-semibold text-lg mb-2 ${feature.textColor}`}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {feature.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent System Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { user: 'Data Entry Clerk', action: 'Added 5 new citizens', time: '10 minutes ago', type: 'add' },
                            { user: 'Admin User', action: 'Updated system settings', time: '1 hour ago', type: 'update' },
                            { user: 'View Only User', action: 'Generated population report', time: '2 hours ago', type: 'view' },
                            { user: 'System', action: 'Automated backup completed', time: '3 hours ago', type: 'system' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'add' ? 'bg-emerald-900/30 text-emerald-400' :
                                        activity.type === 'update' ? 'bg-blue-900/30 text-blue-400' :
                                            activity.type === 'view' ? 'bg-gray-900/30 text-gray-400' :
                                                'bg-purple-900/30 text-purple-400'
                                    }`}>
                                    {activity.type === 'add' ? '+' :
                                        activity.type === 'update' ? '↻' :
                                            activity.type === 'view' ? '👁' : '⚙'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white text-sm">
                                        <span className="font-medium">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-gray-400 text-xs">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            System Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Database</span>
                                <span className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full">Online</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Backup Service</span>
                                <span className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full">Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Security</span>
                                <span className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Last Backup</span>
                                <span className="text-gray-400 text-sm">Today, 02:00 AM</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                                <p className="text-white text-sm">3 pending ID card approvals</p>
                                <Button size="sm" variant="outline" className="mt-2 text-xs">
                                    Review Now
                                </Button>
                            </div>
                            <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                                <p className="text-white text-sm">System update available</p>
                                <Button size="sm" variant="outline" className="mt-2 text-xs">
                                    Schedule Update
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;