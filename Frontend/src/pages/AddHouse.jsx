import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import AddHouseForm from '../components/forms/AddHouseForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddHouse = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
      {/*Header*/}
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
          <h1 className="text-3xl font-bold text-orange-100">Register House</h1>
          <p className="text-blue-100">Add a new house property to the system</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Houses</p>
                <p className="text-xl font-bold text-gray-900">289</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Occupied</p>
                <p className="text-xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Vacant</p>
                <p className="text-xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                <p className="text-xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>House Registration</CardTitle>
          <CardDescription>
            Register a new house property with complete details including location and ownership information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddHouseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddHouse;