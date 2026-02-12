import React from 'react';

const IdCardPreview = ({ cardData, individual }) => {
    return (
        <div className="w-96 mx-auto border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg bg-white">
            {/* Oromia Flag Colors */}
            <div className="h-2 bg-gradient-to-r from-red-600 via-white to-black"></div>

            {/* Header */}
            <div className="bg-gray-50 py-3 px-6 border-b">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            OROMIYA NATIONAL REGIONAL STATE
                        </h2>
                        <p className="text-sm text-gray-600">GINJO GUDURU WOREDA</p>
                        <p className="text-sm text-gray-600">IDENTIFICATION CARD</p>
                    </div>
                    {/* Oromia Flag */}
                    <div className="flex flex-col">
                        <div className="w-6 h-2 bg-red-600"></div>
                        <div className="w-6 h-2 bg-white border border-gray-300"></div>
                        <div className="w-6 h-2 bg-black"></div>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Left Column - Photo */}
                    <div className="col-span-1">
                        <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4 bg-gray-100">
                            {individual?.photo_url ? (
                                <img
                                    src={`http://localhost:5000${individual.photo_url}`}
                                    alt="Photo"
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center text-gray-400">
                                    <span>PHOTO</span>
                                </div>
                            )}
                        </div>

                        {/* Card Number */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">CARD NUMBER</p>
                            <p className="text-lg font-bold tracking-wider text-blue-700">
                                {cardData?.card_number}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="col-span-2">
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-gray-900">NAME / MAQAA / ስም</p>
                                <p className="font-bold">
                                    {individual?.first_name} {individual?.last_name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-900">SEX / SAALA / ጾታ</p>
                                <p className="font-medium">
                                    {individual?.gender === 'male' ? 'Male / Dhirsa / ወንድ' : 'Female / Dhala / ሴት'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-900">DATE OF BIRTH / WAAGGA DHAALCHAA</p>
                                <p className="font-medium">
                                    {new Date(individual?.dob).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    }).toUpperCase()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-900">PLACE OF BIRTH / BAKK DHAALCHAA</p>
                                <p className="font-medium">{cardData?.place_of_birth}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-900">RESIDENCE / TEESSOO / አድራሻ</p>
                                <p className="font-medium">{cardData?.residence_address}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-900">ISSUE DATE</p>
                                    <p className="font-medium">{cardData?.issue_date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-900">EXPIRY DATE</p>
                                    <p className="font-medium">{cardData?.expiry_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdCardPreview;