import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Users, Home, CreditCard, FileEdit, Search, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const DataEntryDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const dataEntryTasks = [
        {
            icon: <UserPlus className="w-6 h-6" />,
            title: 'Add New Citizen',
            description: 'Register a new individual in the system',
            action: () => navigate('/add-individual'),
            color: 'from-blue-900/20 to-blue-700/10',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400'
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Register Family',
            description: 'Create new family records',
            action: () => navigate('/add-family'),
            color: 'from-emerald-900/20 to-emerald-700/10',
            borderColor: 'border-emerald-500/30',
            textColor: 'text-emerald-400'
        },
        {
            icon: <Home className="w-6 h-6" />,
            title: 'Add House',
            description: 'Register new residential houses',
            action: () => navigate('/add-house'),
            color: 'from-amber-900/20 to-amber-700/10',
            borderColor: 'border-amber-500/30',
            textColor: 'text-amber-400'
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: 'Issue ID Card',
            description: 'Generate identification cards',
            action: () => navigate('/add-id-card'),
            color: 'from-purple-900/20 to-purple-700/10',
            borderColor: 'border-purple-500/30',
            textColor: 'text-purple-400'
        },
        {
            icon: <FileEdit className="w-6 h-6" />,
            title: 'Edit Records',
            description: 'Update existing citizen information',
            action: () => navigate('/list-individuals'),
            color: 'from-cyan-900/20 to-cyan-700/10',
            borderColor: 'border-cyan-500/30',
            textColor: 'text-cyan-400'
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: 'Search Records',
            description: 'Find specific citizen or family data',
            action: () => navigate('/list-individuals'),
            color: 'from-gray-900/20 to-gray-700/10',
            borderColor: 'border-gray-500/30',
            textColor: 'text-gray-400'
        }
    ];

    const pendingTasks = [
        { id: 1, type: 'Citizen Registration', count: 5, priority: 'high' },
        { id: 2, type: 'ID Card Issuance', count: 3, priority: 'medium' },
        { id: 3, type: 'House Registration', count: 2, priority: 'low' },
        { id: 4, type: 'Data Updates', count: 8, priority: 'medium' },
    ];

    const recentEntries = [
        { name: 'Alemayehu Kebede', type: 'New Citizen', time: '10 min ago', status: 'completed' },
        { name: 'Tigist Worku Family', type: 'Family Registration', time: '25 min ago', status: 'completed' },
        { name: 'House #245', type: 'House Registration', time: '1 hour ago', status: 'pending' },
        { name: 'ID Card Reprint', type: 'ID Card', time: '2 hours ago', status: 'completed' },
    ];

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900/20 via-blue-800/15 to-transparent border border-blue-500/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                            <FileEdit className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Data Entry Dashboard</h1>
                            <p className="text-blue-200 flex items-center gap-2">
                                <span>Welcome,</span>
                                <span className="font-semibold text-white">{user?.name || 'Data Entry Clerk'}</span>
                                <span className="px-2 py-0.5 bg-blue-900/40 text-blue-200 text-xs rounded-full">
                                    Data Management Access
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="text-right">
                            <p className="text-blue-200 text-sm">Today's Entries</p>
                            <p className="text-2xl font-bold text-white">12</p>
                        </div>
                        <Button
                            onClick={() => navigate('/add-individual')}
                            className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Quick Add
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-black/40 border border-blue-700/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p className="text-gray-400 text-sm mb-1">Today's Entries</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">12</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-300">
                                +3
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 border border-emerald-700/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p className="text-gray-400 text-sm mb-1">Completed</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">8</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 border border-amber-700/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p className="text-gray-400 text-sm mb-1">Pending</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">4</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 border border-purple-700/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p className="text-gray-400 text-sm mb-1">Accuracy Rate</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">98%</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Entry Tasks */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Data Entry Tasks</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-400 border-blue-500/30 hover:bg-blue-900/20"
                    >
                        View All Tasks
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataEntryTasks.map((task, index) => (
                        <button
                            key={index}
                            onClick={task.action}
                            className={`p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] text-left ${task.color} ${task.borderColor}`}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${task.color.replace('/20', '/40').replace('/10', '/30')}`}>
                                <div className={task.textColor}>
                                    {task.icon}
                                </div>
                            </div>
                            <h3 className={`font-semibold text-lg mb-2 ${task.textColor}`}>
                                {task.title}
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {task.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Tasks */}
                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Pending Tasks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${task.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                                                task.priority === 'medium' ? 'bg-amber-900/30 text-amber-400' :
                                                    'bg-blue-900/30 text-blue-400'
                                            }`}>
                                            {task.count}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{task.type}</p>
                                            <p className={`text-xs ${task.priority === 'high' ? 'text-red-400' :
                                                    task.priority === 'medium' ? 'text-amber-400' :
                                                        'text-blue-400'
                                                }`}>
                                                {task.priority === 'high' ? 'High Priority' :
                                                    task.priority === 'medium' ? 'Medium Priority' :
                                                        'Low Priority'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        Start
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Entries */}
                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Recent Entries
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentEntries.map((entry, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entry.status === 'completed' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-amber-900/30 text-amber-400'
                                        }`}>
                                        {entry.status === 'completed' ? '✓' : '⋯'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{entry.name}</p>
                                        <p className="text-gray-400 text-sm">{entry.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-xs">{entry.time}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${entry.status === 'completed' ? 'bg-emerald-900/30 text-emerald-300' : 'bg-amber-900/30 text-amber-300'
                                            }`}>
                                            {entry.status === 'completed' ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions Bar */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-gray-700/50 rounded-full px-4 py-3 shadow-2xl z-50">
                <div className="flex items-center gap-4">
                    <Button
                        size="sm"
                        onClick={() => navigate('/add-individual')}
                        className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Citizen
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/add-family')}
                        className="border-gray-600 text-gray-300 rounded-full"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Add Family
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/add-id-card')}
                        className="border-gray-600 text-gray-300 rounded-full"
                    >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Issue ID
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataEntryDashboard;