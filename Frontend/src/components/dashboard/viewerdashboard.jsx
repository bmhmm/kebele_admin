import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, FileText, Users, Home, BarChart, Search, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const ViewerDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const viewerFeatures = [
        {
            icon: <Eye className="w-6 h-6" />,
            title: 'View Citizens',
            description: 'Browse all registered individuals',
            action: () => navigate('/list-individuals'),
            color: 'from-gray-900/20 to-gray-700/10',
            borderColor: 'border-gray-500/30',
            textColor: 'text-gray-400'
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'View Families',
            description: 'Access family records and details',
            action: () => navigate('/list-families'),
            color: 'from-blue-900/20 to-blue-700/10',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400'
        },
        {
            icon: <Home className="w-6 h-6" />,
            title: 'View Houses',
            description: 'Browse residential house records',
            action: () => navigate('/list-houses'),
            color: 'from-emerald-900/20 to-emerald-700/10',
            borderColor: 'border-emerald-500/30',
            textColor: 'text-emerald-400'
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: 'View ID Cards',
            description: 'Check issued identification cards',
            action: () => navigate('/list-id-cards'),
            color: 'from-purple-900/20 to-purple-700/10',
            borderColor: 'border-purple-500/30',
            textColor: 'text-purple-400'
        },
        {
            icon: <BarChart className="w-6 h-6" />,
            title: 'Generate Reports',
            description: 'Create demographic and statistical reports',
            action: () => alert('Report generation coming soon!'),
            color: 'from-amber-900/20 to-amber-700/10',
            borderColor: 'border-amber-500/30',
            textColor: 'text-amber-400'
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: 'Advanced Search',
            description: 'Search across all records with filters',
            action: () => navigate('/list-individuals'),
            color: 'from-cyan-900/20 to-cyan-700/10',
            borderColor: 'border-cyan-500/30',
            textColor: 'text-cyan-400'
        }
    ];

    const recentViews = [
        { name: 'Alemayehu Kebede', type: 'Citizen Record', viewed: '5 min ago' },
        { name: 'Tigist Worku Family', type: 'Family Record', viewed: '15 min ago' },
        { name: 'Annual Population Report', type: 'Report', viewed: '1 hour ago' },
        { name: 'House #245', type: 'Property Record', viewed: '2 hours ago' },
    ];

    const statistics = [
        { label: 'Total Population', value: '4,832', trend: '+2.3%' },
        { label: 'Total Families', value: '1,208', trend: '+1.5%' },
        { label: 'Total Houses', value: '956', trend: '+0.8%' },
        { label: 'ID Cards Issued', value: '3,845', trend: '+3.2%' },
    ];

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900/20 via-gray-800/15 to-transparent border border-gray-500/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Eye className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">View Only Dashboard</h1>
                            <p className="text-gray-200 flex items-center gap-2">
                                <span>Welcome,</span>
                                <span className="font-semibold text-white">{user?.name || 'Viewer'}</span>
                                <span className="px-2 py-0.5 bg-gray-900/40 text-gray-200 text-xs rounded-full">
                                    Read-Only Access
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="text-right">
                            <p className="text-gray-200 text-sm">Views Today</p>
                            <p className="text-2xl font-bold text-white">27</p>
                        </div>
                        <Button
                            onClick={() => navigate('/list-individuals')}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-900/30"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Search Records
                        </Button>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statistics.map((stat, index) => (
                    <Card key={index} className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-white">{stat.value}</span>
                                {stat.trend && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-300">
                                        {stat.trend}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Viewer Features */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Viewing Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewerFeatures.map((feature, index) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Views */}
                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            Recently Viewed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentViews.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (item.type.includes('Citizen')) navigate('/list-individuals');
                                        else if (item.type.includes('Family')) navigate('/list-families');
                                        else if (item.type.includes('Property')) navigate('/list-houses');
                                    }}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition text-left"
                                >
                                    <div className="w-10 h-10 bg-gray-900/40 rounded-lg flex items-center justify-center">
                                        {item.type.includes('Citizen') ? '👤' :
                                            item.type.includes('Family') ? '👨‍👩‍👧‍👦' :
                                                item.type.includes('Report') ? '📊' : '🏠'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{item.name}</p>
                                        <p className="text-gray-400 text-sm">{item.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-xs">{item.viewed}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Reports */}
                <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Quick Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { title: 'Population Demographics', description: 'Age, gender distribution', icon: '📊' },
                                { title: 'Family Statistics', description: 'Household size analysis', icon: '👨‍👩‍👧‍👦' },
                                { title: 'Housing Report', description: 'Property types and occupancy', icon: '🏠' },
                                { title: 'ID Card Status', description: 'Issued vs pending cards', icon: '🆔' },
                            ].map((report, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition">
                                    <div className="w-10 h-10 bg-gray-900/40 rounded-lg flex items-center justify-center text-lg">
                                        {report.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{report.title}</p>
                                        <p className="text-gray-400 text-sm">{report.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-gray-600 text-gray-300 hover:bg-gray-900/30"
                                        >
                                            <Eye className="w-3 h-3 mr-1" />
                                            View
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-gray-600 text-gray-300 hover:bg-gray-900/30"
                                        >
                                            <Download className="w-3 h-3 mr-1" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search Section */}
            <Card className="bg-black/40 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Quick Search
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search citizens, families, or houses..."
                                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            />
                            <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                                <Filter className="w-3 h-3 mr-1" />
                                By Name
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                                <Filter className="w-3 h-3 mr-1" />
                                By ID Number
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                                <Filter className="w-3 h-3 mr-1" />
                                By Address
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                                <Filter className="w-3 h-3 mr-1" />
                                By Family
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Information Banner */}
            <div className="p-4 bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-600/30 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">View Only Access Notice</h3>
                        <p className="text-gray-400 text-sm">
                            Your role has read-only permissions. You can view all data and generate reports, but cannot add, edit, or delete any records. Contact an administrator if you need editing privileges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerDashboard;