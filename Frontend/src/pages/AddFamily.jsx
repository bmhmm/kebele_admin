import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import AddFamilyForm from '../components/forms/AddFamilyForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddFamily = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-orange-100">Register Family</h1>
          <p className="text-blue-100">Add a new family to the kebele system</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Families</p>
                <p className="text-xl font-bold text-gray-900">342</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Avg. Members</p>
                <p className="text-xl font-bold text-gray-900">3.6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                <p className="text-xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Family Registration</CardTitle>
          <CardDescription>
            Register a new family with all members. The family head information is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddFamilyForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFamily;