import React from 'react';
import { clsx } from 'clsx';
import { 
  Users, 
  Home, 
  IdCard, 
  Building, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
  UserPlus,
  HomeIcon,
  IdCardIcon
} from 'lucide-react';

// Simple SVG Chart Components
const BarChart = ({ data, color = 'blue', height = 40 }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end justify-between w-full h-full space-x-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center"
          style={{ height: `${height}px` }}
        >
          <div
            className={clsx(
              'w-full rounded-t transition-all duration-500 ease-out',
              `bg-${color}-500`,
              'hover:opacity-80'
            )}
            style={{ 
              height: `${(value / maxValue) * 100}%`,
              minHeight: '4px'
            }}
          />
        </div>
      ))}
    </div>
  );
};

const LineChart = ({ data, color = 'blue', height = 40 }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((value - minValue) / range) * 100;
    return `${x},${100 - y}`;
  }).join(' ');

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`var(--color-${color}-500)`} stopOpacity="0.3" />
            <stop offset="100%" stopColor={`var(--color-${color}-500)`} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <polygon
          fill={`url(#gradient-${color})`}
          points={`0,100 ${points} 100,100`}
          className="transition-all duration-500"
        />
        
        {/* Line */}
        <polyline
          fill="none"
          stroke={`var(--color-${color}-500)`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="transition-all duration-500"
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((value - minValue) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={100 - y}
              r="2"
              fill={`var(--color-${color}-500)`}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
    </div>
  );
};

const DonutChart = ({ value, max = 100, color = 'blue', size = 60 }) => {
  const percentage = (value / max) * 100;
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`text-${color}-500 transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold text-${color}-600`}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

// Individual Stat Card Component
const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  chartType = 'line',
  chartData,
  color = 'blue',
  loading = false,
  onClick 
}) => {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const iconColors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  const chartComponents = {
    line: LineChart,
    bar: BarChart,
    donut: DonutChart
  };

  const ChartComponent = chartComponents[chartType];

  if (loading) {
    return (
      <div className="bg-orange-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="mt-4 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        "relative rounded-2xl p-6 border border-orange-200 shadow-md cursor-pointer group transition-all duration-500 ease-in-out",
    "bg-gradient-to-br from-orange-50 via-gray-400 to-orange-300",
    "hover:from-gray-400 hover:via-orange-200 hover:to-gray-300",
    " hover:border-orange-300",
        onClick && 'hover:border-gray-300'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={clsx(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          iconColors[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h3>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            
            {change !== undefined && (
              <div className="flex items-center space-x-1 mt-1">
                <div className={clsx(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  changeColors[changeType]
                )}>
                  {changeType === 'positive' && <ArrowUp className="w-3 h-3 mr-1" />}
                  {changeType === 'negative' && <ArrowDown className="w-3 h-3 mr-1" />}
                  {change}%
                </div>
                <span className="text-xs text-gray-600">from last week</span>
              </div>
            )}
          </div>
          
          {chartType === 'donut' && chartData && (
            <DonutChart value={chartData.value} max={chartData.max} color={color} />
          )}
        </div>
      </div>

      {/* Chart */}
      {chartData && chartType !== 'donut' && (
        <div className="mt-4">
          <ChartComponent 
            data={chartData} 
            color={color}
            height={40}
          />
        </div>
      )}
    </div>
  );
};

// Main StatsCards Component
const StatsCards = ({ 
  data = [],
  loading = false,
  timeframe = 'week',
  onTimeframeChange,
  onExport,
  className 
}) => {
  // Default data if none provided
  const defaultStats = [
    {
      id: 1,
      title: 'Total Individuals',
      value: 1247,
      change: 12.5,
      changeType: 'positive',
      icon: Users,
      color: 'blue',
      chartType: 'line',
      chartData: [45, 52, 38, 65, 72, 68, 74],
      onClick: () => console.log('View individuals')
    },
    {
      id: 2,
      title: 'Registered Families',
      value: 342,
      change: 8.2,
      changeType: 'positive',
      icon: Home,
      color: 'green',
      chartType: 'bar',
      chartData: [12, 18, 15, 22, 25, 28, 30],
      onClick: () => console.log('View families')
    },
    {
      id: 3,
      title: 'Houses Registered',
      value: 289,
      change: -3.1,
      changeType: 'negative',
      icon: Building,
      color: 'purple',
      chartType: 'line',
      chartData: [30, 25, 35, 40, 32, 28, 25],
      onClick: () => console.log('View houses')
    },
    {
      id: 4,
      title: 'ID Cards Issued',
      value: 856,
      change: 15.7,
      changeType: 'positive',
      icon: IdCard,
      color: 'orange',
      chartType: 'donut',
      chartData: { value: 856, max: 1247 },
      onClick: () => console.log('View ID cards')
    },
    {
      id: 5,
      title: 'New Registrations',
      value: 47,
      change: 22.3,
      changeType: 'positive',
      icon: UserPlus,
      color: 'indigo',
      chartType: 'line',
      chartData: [8, 12, 6, 15, 20, 18, 25],
      onClick: () => console.log('View new registrations')
    },
    {
      id: 6,
      title: 'Active This Week',
      value: 234,
      change: 5.6,
      changeType: 'positive',
      icon: Calendar,
      color: 'blue',
      chartType: 'bar',
      chartData: [40, 35, 45, 50, 48, 52, 55],
      onClick: () => console.log('View activity')
    }
  ];

  const stats = data.length > 0 ? data : defaultStats;

  const timeframeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-orange-200">Overview</h2>
          <p className="text-orange-100 mt-1">Key metrics and statistics for your kebele</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onTimeframeChange?.(option.value)}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  timeframe === option.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            chartType={stat.chartType}
            chartData={stat.chartData}
            color={stat.color}
            loading={loading}
            onClick={stat.onClick}
          />
        ))}
      </div>

      {/* Summary Cards */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats Summary */}
          <div className="lg:col-span-2 bg-gradient-to-br from-black to-orange-900 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-orange-100 text-sm">Avg. Growth</p>
                <p className="text-2xl font-bold">12.8%</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm">Active Users</p>
                <p className="text-2xl font-bold">1.2K</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm">Satisfaction</p>
                <p className="text-2xl font-bold">4.8/5</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-orange-100 rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New family registered', time: '2 min ago', type: 'success' },
                { action: 'ID card issued', time: '1 hour ago', type: 'info' },
                { action: 'House data updated', time: '3 hours ago', type: 'warning' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={clsx(
                    'w-2 h-2 rounded-full',
                    activity.type === 'success' && 'bg-green-500',
                    activity.type === 'info' && 'bg-blue-500',
                    activity.type === 'warning' && 'bg-yellow-500'
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCards;