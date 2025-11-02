import React from 'react';
import { Users, ArrowLeft, Download, Filter } from 'lucide-react';
import IndividualsTable from '../components/tables/IndividualsTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ListIndividuals = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleExport = () => {
    console.log('Exporting individuals data...');
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
            <h1 className="text-3xl font-bold text-orange-100">Individuals</h1>
            <p className="text-blue-100">Manage and view all registered individuals</p>
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
            startIcon={<Users className="w-4 h-4" />}
            onClick={() => window.location.href = '/add-individual'}
          >
            Add Individual
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Male</p>
              <p className="text-2xl font-bold text-gray-900">642</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Female</p>
              <p className="text-2xl font-bold text-gray-900">605</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">With ID</p>
              <p className="text-2xl font-bold text-gray-900">856</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Active</p>
              <p className="text-2xl font-bold text-gray-900">1,189</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Individuals Management</CardTitle>
          <CardDescription>
            View, search, and manage all individuals in the system. Use filters to find specific records.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <IndividualsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListIndividuals;