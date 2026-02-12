import React, { useState, useEffect } from 'react';
import { IdCard, Search, ArrowLeft, Filter, Download, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ListIdCards = () => {

    const [selectedCard, setSelectedCard] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [cardDetails, setCardDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

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

    const handleBack = () => {
        window.history.back();
    };

    const handleView = async (cardId) => {
        try {
            setLoadingDetails(true);
            const response = await fetch(`http://localhost:5000/api/id-cards/${cardId}`);
            const result = await response.json();

            if (result.success) {
                setCardDetails(result.data);
                setSelectedCard(cardId);
                setShowPreview(true);
            } else {
                alert('Error loading card details');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to load card details');
        } finally {
            setLoadingDetails(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex relative items-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    startIcon={<ArrowLeft className="w-4 h-4" />}
                >
                    Back
                </Button>
                <div className="ml-5">
                    <h1 className="text-3xl font-bold text-blue-300">Issued ID Cards</h1>
                    <p className=" text-gray-400">View and manage all registered ID Cards</p>
                </div>
                <div className="absolute top-0 right-0">
                    <Button onClick={() => window.location.href = '/add-id-card'}>
                        <IdCard className="w-4 h-4 mr-2" />
                        Issue New ID
                    </Button>
                </div>
            </div>



            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-50 via-gray-300 to-orange-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Total Issued</p>
                    <p className="text-2xl font-bold">{idCards.length}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 via-gray-300 to-orange-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold">
                        {idCards.filter(card => card.status === 'issued').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 via-gray-300 to-orange-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">
                        {idCards.filter(card => card.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 via-gray-300 to-orange-50 p-4 rounded-lg shadow">
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
                    {/* In your table body */}


                    <tbody className="divide-y divide-gray-200">
                        {idCards.map((card) => (
                            <tr key={card.id}>
                                <td className="px-6 py-4">
                                    <span className="font-mono font-bold text-blue-600">
                                        {card.card_number}
                                    </span>
                                </td>

                                {/* In your table body */}
                                {/* <td className="px-6 py-4">
                                    {card.individual?.first_name} {card.individual?.last_name}
                                </td> */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {card.photo_url ? (
                                            <img
                                                src={`http://localhost:5000${card.photo_url}`}
                                                alt={card.first_name}
                                                className="w-8 h-8 rounded-full mr-3 object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-xs font-bold text-blue-600">
                                                    {card.first_name?.charAt(0)}{card.last_name?.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">
                                                {card.first_name} {card.last_name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ID: {card.individual_id} • {card.phone || 'No phone'}
                                            </p>
                                        </div>
                                    </div>
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
                                        onClick={() => handleView(card.id)}
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {showPreview && cardDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-auto">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-2xl font-bold">ID Card Preview</h2>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Your IdCardPreview component or inline preview */}
                                <div className="border-2 border-gray-300 rounded-xl p-6 bg-white max-w-md mx-auto">
                                    <div className="h-2 bg-gradient-to-r from-red-600 via-white to-black mb-4"></div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-bold">OROMIYA NATIONAL REGIONAL STATE</h3>
                                        <p className="text-sm text-gray-600">GINJO GUDURU WOREDA</p>
                                        <p className="text-sm text-gray-600">IDENTIFICATION CARD</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            {cardDetails.photo_url ? (
                                                <img
                                                    src={`http://localhost:5000${cardDetails.photo_url}`}
                                                    alt="Photo"
                                                    className="w-full h-48 object-cover rounded border"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded border">
                                                    <span className="text-gray-400">PHOTO</span>
                                                </div>
                                            )}
                                            <div className="mt-4 text-center">
                                                <p className="text-xs text-gray-500">CARD NUMBER</p>
                                                <p className="text-lg font-bold text-blue-700">{cardDetails.card_number}</p>
                                            </div>
                                        </div>

                                        <div className="col-span-2 space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500">NAME / MAQAA / ስም</p>
                                                <p className="font-bold text-lg">{cardDetails.first_name} {cardDetails.last_name}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">GENDER / SAALA / ጾታ</p>
                                                <p className="font-medium">{cardDetails.gender === 'male' ? 'Male' : 'Female'}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">DATE OF BIRTH</p>
                                                <p className="font-medium">
                                                    {new Date(cardDetails.dob).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    }).toUpperCase()}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">PLACE OF BIRTH</p>
                                                <p className="font-medium">{cardDetails.place_of_birth || 'Jimma Zone, Oromiya'}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">RESIDENCE ADDRESS</p>
                                                <p className="font-medium">{cardDetails.residence_address || 'Ginjo Guduru, Jimma'}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">ISSUE DATE</p>
                                                    <p className="font-medium">{cardDetails.issue_date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">EXPIRY DATE</p>
                                                    <p className="font-medium">{cardDetails.expiry_date}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">BLOOD TYPE</p>
                                                <p className="font-medium">{cardDetails.blood_type || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t flex justify-end space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowPreview(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => window.print()}
                                >
                                    Print Card
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListIdCards;