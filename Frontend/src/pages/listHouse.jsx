import React, { useState, useEffect } from 'react';
import {
    Home,
    ArrowLeft,
    Search,
    Filter,
    Eye,
    Edit,
    Download,
    MapPin,
    User,
    Phone,
    Calendar,
    Building,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    ExternalLink,
    Printer
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const ListHouses = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterZone, setFilterZone] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        occupied: 0,
        vacant: 0,
        thisMonth: 0
    });

    const handleBack = () => {
        window.history.back();
    };

    const fetchHouses = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:5000/api/houses');

            if (!response.ok) {
                throw new Error(`Failed to fetch houses: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setHouses(result.data);

                // Calculate stats
                const total = result.data.length;
                const occupied = result.data.filter(h => h.status === 'occupied').length;
                const vacant = result.data.filter(h => h.status === 'vacant').length;
                const thisMonthCount = result.data.filter(h => {
                    const createdDate = new Date(h.created_at || h.createdAt);
                    const now = new Date();
                    return createdDate.getMonth() === now.getMonth() &&
                        createdDate.getFullYear() === now.getFullYear();
                }).length;

                setStats({ total, occupied, vacant, thisMonth: thisMonthCount });
            } else {
                throw new Error(result.message || 'Failed to load houses');
            }
        } catch (err) {
            console.error('Error fetching houses:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHouses();
    }, []);

    // Filter houses
    const filteredHouses = houses.filter(house => {
        const matchesSearch =
            house.house_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            house.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            house.zone?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || house.status === filterStatus;
        const matchesZone = filterZone === 'all' || house.zone === filterZone;

        return matchesSearch && matchesStatus && matchesZone;
    });

    // Pagination
    const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedHouses = filteredHouses.slice(startIndex, startIndex + itemsPerPage);

    // Get unique zones for filter
    const uniqueZones = [...new Set(houses.map(house => house.zone))].filter(Boolean);

    const getStatusColor = (status) => {
        switch (status) {
            case 'occupied': return 'bg-green-100 text-green-800';
            case 'vacant': return 'bg-yellow-100 text-yellow-800';
            case 'under_construction': return 'bg-blue-100 text-blue-800';
            case 'damaged': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'occupied': return <CheckCircle className="w-4 h-4" />;
            case 'vacant': return <XCircle className="w-4 h-4" />;
            case 'under_construction': return <Clock className="w-4 h-4" />;
            case 'damaged': return <AlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleViewDetails = (house) => {
        setSelectedHouse(house);
        setShowDetails(true);
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading houses data...</p>
                </div>
            </div>
        );
    }

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
                        <h1 className="text-3xl font-bold text-blue-300">Houses Management</h1>
                        <p className="text-gray-400">View and manage all registered houses</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Button
                        variant="outline"
                        onClick={fetchHouses}
                        startIcon={<RefreshCw className="w-4 h-4" />}
                        disabled={loading}
                    >
                        Refresh
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/add-house'}
                        startIcon={<Home className="w-4 h-4" />}
                    >
                        Add House
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Total Houses</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                                <Home className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Occupied</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.occupied}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Vacant</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.vacant}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by house number, owner name, or zone..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="all">All Status</option>
                            <option value="occupied">Occupied</option>
                            <option value="vacant">Vacant</option>
                            <option value="under_construction">Under Construction</option>
                            <option value="damaged">Damaged</option>
                        </select>
                    </div>
                </div>

                {/* Zone Filter */}
                <div className="mt-4">
                    <select
                        value={filterZone}
                        onChange={(e) => {
                            setFilterZone(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="all">All Zones</option>
                        {uniqueZones.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || filterStatus !== 'all' || filterZone !== 'all') && (
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                                setFilterZone('all');
                                setCurrentPage(1);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">
                        Showing {paginatedHouses.length} of {filteredHouses.length} houses
                        {houses.length > filteredHouses.length && ` (${houses.length} total)`}
                    </p>
                </div>
                <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </div>
            </div>

            {/* Houses Grid */}
            {filteredHouses.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No houses found</h3>
                    <p className="text-gray-600 mb-4">
                        {houses.length === 0 ? 'No houses have been registered yet.' : 'No houses match your search criteria.'}
                    </p>
                    <Button onClick={() => window.location.href = '/add-house'}>
                        Register First House
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedHouses.map((house) => (
                        <div
                            key={house.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            {/* House Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Home className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{house.house_number}</h3>
                                            <p className="text-sm text-gray-500">{house.zone}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(house.status)}`}>
                                        {getStatusIcon(house.status)}
                                        <span>{house.status?.replace('_', ' ').toUpperCase()}</span>
                                    </span>
                                </div>

                                {/* Property Type */}
                                <div className="mb-3">
                                    <span className="text-xs text-gray-500">Property Type</span>
                                    <p className="text-sm font-medium text-gray-900">
                                        {house.property_type?.replace('_', ' ').toUpperCase() || 'RESIDENTIAL'}
                                    </p>
                                </div>

                                {/* Owner Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 truncate">{house.owner_name || 'Unknown Owner'}</span>
                                    </div>
                                    {house.owner_phone && (
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{house.owner_phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* House Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <span className="text-xs text-gray-500">Rooms</span>
                                        <p className="text-sm font-medium text-gray-900">{house.rooms || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Area</span>
                                        <p className="text-sm font-medium text-gray-900">{house.area ? `${house.area} m²` : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Year Built</span>
                                        <p className="text-sm font-medium text-gray-900">{house.construction_year || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Registration</span>
                                        <p className="text-sm font-medium text-gray-900">{formatDate(house.created_at)}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mb-6">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-gray-500">Address</span>
                                            <p className="text-sm text-gray-900 line-clamp-2">
                                                {house.address || `${house.kebele}, ${house.city}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewDetails(house)}
                                        startIcon={<Eye className="w-4 h-4" />}
                                    >
                                        View
                                    </Button>
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditHouse(house)}
                                        startIcon={<Edit className="w-4 h-4" />}
                                    >
                                        Edit
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredHouses.length)} of {filteredHouses.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* House Details Modal */}
            {showDetails && selectedHouse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">House Details</h2>
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                    <Home className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">House Number</p>
                                                    <p className="text-xl font-bold text-gray-900">{selectedHouse.house_number}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Zone</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.zone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Kebele</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.kebele}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">City/Town</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.city}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Region</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.region}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specifications */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Property Type</p>
                                                <p className="font-medium text-gray-900">{selectedHouse.property_type?.replace('_', ' ').toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedHouse.status)}`}>
                                                    {selectedHouse.status?.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Rooms</p>
                                                <p className="font-medium text-gray-900">{selectedHouse.rooms || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Area</p>
                                                <p className="font-medium text-gray-900">{selectedHouse.area ? `${selectedHouse.area} m²` : 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Construction Year</p>
                                                <p className="font-medium text-gray-900">{selectedHouse.construction_year || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Owner Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                    <User className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Owner Name</p>
                                                    <p className="text-lg font-bold text-gray-900">{selectedHouse.owner_name || 'Not specified'}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone Number</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.owner_phone || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">ID Number</p>
                                                    <p className="font-medium text-gray-900">{selectedHouse.owner_id_number || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address & Utilities */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address & Utilities</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Full Address</p>
                                                <p className="font-medium text-gray-900">{selectedHouse.address || `${selectedHouse.kebele}, ${selectedHouse.city}`}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Electricity</p>
                                                    <div className="flex items-center space-x-2">
                                                        {selectedHouse.has_electricity ? (
                                                            <>
                                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm text-gray-900">Available</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-4 h-4 text-red-600" />
                                                                <span className="text-sm text-gray-900">Not Available</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Water Supply</p>
                                                    <div className="flex items-center space-x-2">
                                                        {selectedHouse.has_water ? (
                                                            <>
                                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm text-gray-900">Available</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-4 h-4 text-red-600" />
                                                                <span className="text-sm text-gray-900">Not Available</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Registration Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Registered On</p>
                                                <p className="font-medium text-gray-900">{formatDate(selectedHouse.created_at)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <p className="font-medium text-gray-900">{formatDate(selectedHouse.updated_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedHouse.notes && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-gray-700">{selectedHouse.notes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetails(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handlePrint}
                                    startIcon={<Printer className="w-4 h-4" />}
                                >
                                    Print Details
                                </Button>
                                {/* <Button
                                    onClick={() => }
                                    startIcon={<Edit className="w-4 h-4" />}
                                >
                                    Edit House
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListHouses;