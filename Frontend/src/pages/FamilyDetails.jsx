// Create: src/pages/FamilyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Home, Phone, MapPin, User } from 'lucide-react';
import { Button } from '../components/ui/Button';

const FamilyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFamily();
  }, [id]);

  const fetchFamily = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/families/${id}`);
      const result = await response.json();

      if (result.success) {
        setFamily(result.data);
      } else {
        setError('Family not found');
      }
    } catch (err) {
      setError('Failed to load family');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/families');
  };

  const handleAddMembers = () => {
    navigate(`/families/${id}/add-members`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!family) return <div>No family found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBack}
              startIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Family Details</h1>
              <p className="text-gray-600">Family {family.family_number}</p>
            </div>
          </div>

          <Button
            onClick={handleAddMembers}
            startIcon={<Users className="w-4 h-4" />}
          >
            Add Members
          </Button>
        </div>

        {/* Family Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Family Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Family Number</label>
                <p className="font-medium">{family.family_number}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">House Number</label>
                <div className="flex items-center space-x-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <p className="font-medium">{family.house_number}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Zone</label>
                <p className="font-medium">{family.zone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Head of Family</h2>
            {family.head && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {family.head.firstName} {family.head.lastName}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{family.head.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Family Members</h2>
            <span className="text-sm text-gray-600">
              {family.members?.length || 0} members
            </span>
          </div>

          {family.members && family.members.length > 0 ? (
            <div className="space-y-4">
              {family.members.map((member, index) => (
                <div key={index} className="border rounded-xl p-4 bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {member.firstName} {member.lastName}
                        </h4>
                        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Relationship:</span>
                            <span className="ml-2 font-medium capitalize">
                              {member.relationship}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Phone:</span>
                            <span className="ml-2 font-medium">
                              {member.phone || 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Gender:</span>
                            <span className="ml-2 font-medium capitalize">
                              {member.gender || 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Age:</span>
                            <span className="ml-2 font-medium">
                              {member.age || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No additional members</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleAddMembers}
              >
                Add Members
              </Button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default FamilyDetails;