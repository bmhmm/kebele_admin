import React, { useState, useEffect } from 'react';
import { Users, ArrowLeft, Download, Filter, UserPlus, Home, UserCheck, Calendar, UsersIcon } from 'lucide-react';
import FamiliesTable from '../components/tables/FamiliesTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ListFamilies = () => {
  const [stats, setStats] = useState({
    totalFamilies: 0,
    totalMembers: 0,
    avgPerFamily: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFamilyStats();
  }, []);



  const fetchFamilyStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all individuals
      const response = await fetch('http://localhost:5000/api/individuals');
      const result = await response.json();

      if (result.success && result.data) {
        const individuals = result.data;

        // Get unique family numbers that have heads
        const familiesWithHeads = new Set();
        const familyMembersCount = {};
        const thisMonth = new Date().getMonth();

        individuals.forEach(ind => {
          if (ind.familyNumber) {
            // Count family members
            familyMembersCount[ind.familyNumber] = (familyMembersCount[ind.familyNumber] || 0) + 1;

            // Count as family only if this individual is the head
            if (ind.relationship === 'head') {
              familiesWithHeads.add(ind.familyNumber);
            }
          }
        });

        const totalFamilies = familiesWithHeads.size;
        const totalMembers = Object.values(familyMembersCount).reduce((sum, count) => sum + count, 0);
        const avgPerFamily = totalFamilies > 0 ? (totalMembers / totalFamilies).toFixed(1) : 0;

        // Calculate this month's families (heads created this month)
        const thisMonthCount = individuals.filter(ind => {
          const createdDate = new Date(ind.createdAt || ind.created_at);
          return createdDate.getMonth() === thisMonth &&
            ind.relationship === 'head' &&
            ind.familyNumber;
        }).length;

        setStats({
          totalFamilies,
          totalMembers,
          avgPerFamily: parseFloat(avgPerFamily),
          thisMonth: thisMonthCount
        });
      } else {
        throw new Error('Failed to load individuals data');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleExport = async () => {
    try {
      // Show loading state on button
      const exportBtn = document.querySelector('button[title="Export"]');
      const originalBtnContent = exportBtn?.innerHTML;
      if (exportBtn) {
        exportBtn.innerHTML = `
        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Exporting...</span>
      `;
        exportBtn.disabled = true;
      }

      // Fetch all individuals for export
      const response = await fetch('http://localhost:5000/api/individuals');

      if (!response.ok) {
        throw new Error('Failed to fetch data for export');
      }

      const result = await response.json();

      if (!result.success || !result.data || result.data.length === 0) {
        throw new Error('No data available for export');
      }

      const individualsData = result.data;

      // Helper functions for formatting
      const getEducationLabel = (level) => {
        const educationMap = {
          none: 'No Formal Education',
          primary: 'Primary School',
          secondary: 'Secondary School',
          diploma: 'Diploma',
          bachelor: "Bachelor's Degree",
          masters: "Master's Degree",
          phd: 'PhD'
        };
        return educationMap[level] || level;
      };

      const getRelationshipLabel = (relationship) => {
        const relationshipMap = {
          head: 'Head',
          spouse: 'Spouse',
          child: 'Child',
          parent: 'Parent',
          sibling: 'Sibling',
          other: 'Other Relative'
        };
        return relationshipMap[relationship] || relationship;
      };

      const getReligionLabel = (religion) => {
        const religionMap = {
          islam: 'Islam',
          orthodox: 'Orthodox Christian',
          protestant: 'Protestant',
          catholic: 'Catholic',
          other: 'Other'
        };
        return religionMap[religion] || religion;
      };

      // Prepare CSV data
      const exportData = individualsData.map(ind => ({
        'ID': ind.id || '',
        'First Name': ind.firstName || '',
        'Last Name': ind.lastName || '',
        'Date of Birth': ind.dob ? new Date(ind.dob).toLocaleDateString() : '',
        'Age': ind.age || '',
        'Gender': ind.gender ? ind.gender.charAt(0).toUpperCase() + ind.gender.slice(1) : '',
        'Religion': getReligionLabel(ind.religion) || '',
        'Nationality': ind.nationality === 'ethiopian' ? 'Ethiopian' : 'Other',
        'Occupation': ind.occupation || '',
        'Education Level': getEducationLabel(ind.education) || '',
        'Family Number': ind.familyNumber || '',
        'House Number': ind.houseNumber || '',
        'Relationship': getRelationshipLabel(ind.relationship) || '',
        'Phone Number': ind.phone || '',
        'Email': ind.email || '',
        'Registration Date': ind.createdAt ? new Date(ind.createdAt).toLocaleDateString() : ''
      }));

      // Convert to CSV format
      const headers = Object.keys(exportData[0]).join(',');

      const csvRows = exportData.map(row =>
        Object.values(row).map(value => {
          const stringValue = String(value || '');
          return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(',')
      );

      const csvContent = [headers, ...csvRows].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Generate filename with current date
      const today = new Date();
      const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      link.href = url;
      link.download = `kebele_familiess_${dateString}.csv`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
      notification.innerHTML = `
      <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>Exported ${exportData.length} individuals successfully!</span>
    `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);

    } catch (error) {
      console.error('Export error:', error);

      // Show error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
      errorDiv.innerHTML = `
      <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span>Export failed: ${error.message}</span>
    `;
      document.body.appendChild(errorDiv);

      setTimeout(() => {
        errorDiv.remove();
      }, 5000);

    } finally {
      // Restore button state
      const exportBtn = document.querySelector('button[title="Export"]');
      if (exportBtn) {
        exportBtn.innerHTML = originalBtnContent || `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>Export</span>
      `;
        exportBtn.disabled = false;
      }
    }
  };

  const handleRefresh = () => {
    fetchFamilyStats();
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
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
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
        {/* Total Families Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Families</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalFamilies.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Members Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Members</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.totalMembers.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average per Family Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Avg. per Family</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {/* {stats.avgPerFamily.toFixed(1)} */}
                    {typeof stats.avgPerFamily === 'number'
                      ? stats.avgPerFamily.toFixed(1)
                      : '0.0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">This Month</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : error ? (
                  <p className="text-sm text-red-600 mt-2">Error loading</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stats.thisMonth}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Families Management</CardTitle>
              <CardDescription>
                View, search, and manage all families in the system. Click on families to view detailed information.
              </CardDescription>
            </div>
            {error && (
              <div className="text-red-600 text-sm">
                <p>Failed to load statistics: {error}</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <FamiliesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListFamilies;