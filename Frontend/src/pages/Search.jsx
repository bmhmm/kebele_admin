import React, { useState } from 'react';
import { Search, Filter, Users, Home, IdCard, User, Building, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTypes = [
    { value: 'all', label: 'All', icon: Search, color: 'blue' },
    { value: 'individuals', label: 'Individuals', icon: User, color: 'green' },
    { value: 'families', label: 'Families', icon: Users, color: 'purple' },
    { value: 'houses', label: 'Houses', icon: Home, color: 'orange' },
    { value: 'id_cards', label: 'ID Cards', icon: IdCard, color: 'indigo' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock search results
    const mockResults = [
      {
        id: 1,
        type: 'individual',
        title: 'John Doe',
        description: 'Individual - Age 32, Teacher',
        details: 'Family: FAM001, House: H001',
        icon: User,
        color: 'green'
      },
      {
        id: 2,
        type: 'family',
        title: 'Doe Family',
        description: 'Family - 4 members',
        details: 'Head: John Doe, House: H001',
        icon: Users,
        color: 'purple'
      },
      {
        id: 3,
        type: 'house',
        title: 'House H001',
        description: 'House - Residential, Zone 1',
        details: 'Owner: John Doe, 3 bedrooms',
        icon: Home,
        color: 'orange'
      },
      {
        id: 4,
        type: 'id_card',
        title: 'ID Card #ID001',
        description: 'ID Card - Issued to John Doe',
        details: 'Issued: 2024-01-15, Expires: 2029-01-15',
        icon: IdCard,
        color: 'indigo'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-orange-100">Search Records</h1>
        <p className="text-blue-100 mt-1">Find individuals, families, houses, and ID cards in the system</p>
      </div>

      {/* Search Section */}
      <Card className="border-gray-900">
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>
            Use the search tools below to find specific records across the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {searchTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSearchType(type.value)}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                        searchType === type.value
                          ? `border-${type.color}-500 bg-${type.color}-50 shadow-sm`
                          : 'border-gray-900 hover:border-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 text-${type.color}-600 mx-auto mb-2`} />
                      <div className="text-sm font-medium text-gray-900">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by name, ID, family number, house number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startIcon="search"
                  className="border-gray-900 text-gray-900 placeholder-gray-600"
                />
              </div>
              <Button type="submit" loading={isSearching}>
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button type="button" variant="outline" onClick={clearSearch}>
                Clear
              </Button>
            </div>

            {/* Advanced Filters */}
            <div className="border-t border-gray-900 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Zone"
                  type="text"
                  placeholder="Enter zone"
                  className="border-gray-900 text-gray-900 placeholder-gray-600"
                />
                <Input
                  label="Date Range"
                  type="date"
                  placeholder="From date"
                  className="border-gray-900 text-gray-900"
                />
                <Input
                  label="To"
                  type="date"
                  placeholder="To date"
                  className="border-gray-900 text-gray-900"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="border-gray-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  Found {searchResults.length} results for "{searchQuery}"
                </CardDescription>
              </div>
              <Button variant="outline" startIcon={<Download className="w-4 h-4" />}>
                Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => {
                const Icon = result.icon;
                return (
                  <div
                    key={result.id}
                    className="flex items-start space-x-4 p-4 border border-gray-900 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-${result.color}-50 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${result.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{result.description}</p>
                      <p className="text-sm text-gray-500">{result.details}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results State */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <Card className="border-gray-900">
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              No matches found for "<span className="font-medium">{searchQuery}</span>". Try different keywords or check your filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      <Card className="border-gray-900">
        <CardHeader>
          <CardTitle>Search Tips</CardTitle>
          <CardDescription>
            How to get the best results from your search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">For Individuals</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Search by full name or partial name</li>
                <li>• Use family number or house number</li>
                <li>• Search by occupation or education</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">For Families & Houses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use family head's name</li>
                <li>• Search by family number</li>
                <li>• Use house number or zone</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPage;