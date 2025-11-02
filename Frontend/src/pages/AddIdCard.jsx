import React from 'react';
import { IdCard, ArrowLeft } from 'lucide-react';
import AddIdCardForm from '../components/forms/AddIdCardForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AddIdCard = () => {
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
          <h1 className="text-3xl font-bold text-orange-100">Issue ID Card</h1>
          <p className="text-blue-100">Create and issue identification cards</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <IdCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Issued</p>
                <p className="text-xl font-bold text-gray-900">856</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <IdCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                <p className="text-xl font-bold text-gray-900">64</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <IdCard className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pending</p>
                <p className="text-xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <IdCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Coverage</p>
                <p className="text-xl font-bold text-gray-900">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>ID Card Issuance</CardTitle>
          <CardDescription>
            Issue new identification cards for registered individuals. Search for the individual first to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddIdCardForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIdCard;