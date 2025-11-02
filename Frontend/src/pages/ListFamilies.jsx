import React from 'react';
import { Users, ArrowLeft, Download, Filter, UserPlus } from 'lucide-react';
import FamiliesTable from '../components/tables/FamiliesTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ListFamilies = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleExport = () => {
    console.log('Exporting families data...');
    // Implement export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
            <h1 className="text-3xl font-bold text-orange-100">Families</h1>
            <p className="text-blue-100">Manage and view all registered families</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            startIcon={<Filter className="w-4 h-4" />}
          >
            Filters
          </Button>
          <Button
            variant="outline"
            startIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            startIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => window.location.href = '/add-family'}
          >
            Add Family
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Total Families</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Avg. per Family</p>
              <p className="text-2xl font-bold text-gray-900">3.6</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">This Month</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Families Management</CardTitle>
          <CardDescription>
            View, search, and manage all families in the system. Click on families to view detailed information.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <FamiliesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListFamilies;