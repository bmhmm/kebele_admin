import React, { useState, useEffect } from 'react';
import { IdCard, Search, Filter, Download, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ListIdCards = () => {
    const [idCards, setIdCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIdCards();
    }, []);

    const fetchIdCards = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/id-cards');
            const result = await response.json();

            if (result.success) {
                setIdCards(result.data);
            }
        } catch (err) {
            console.error('Error fetching ID cards:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Issued ID Cards</h1>
                <Button onClick={() => window.location.href = '/issue-id-card'}>
                    <IdCard className="w-4 h-4 mr-2" />
                    Issue New ID
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Total Issued</p>
                    <p className="text-2xl font-bold">{idCards.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold">
                        {idCards.filter(card => card.status === 'issued').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">
                        {idCards.filter(card => card.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Expired</p>
                    <p className="text-2xl font-bold">
                        {idCards.filter(card => card.status === 'expired').length}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Card Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {idCards.map((card) => (
                            <tr key={card.id}>
                                <td className="px-6 py-4">
                                    <span className="font-mono font-bold text-blue-600">
                                        {card.card_number}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {card.individual?.first_name} {card.individual?.last_name}
                                </td>
                                <td className="px-6 py-4">{new Date(card.issue_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(card.expiry_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${card.status === 'issued' ? 'bg-green-100 text-green-800' :
                                            card.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {card.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewIdCard(card.id)}
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListIdCards;