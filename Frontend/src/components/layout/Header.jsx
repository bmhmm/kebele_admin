import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, LogOut, Settings, Menu } from 'lucide-react';


const Header = ({ onToggleSidebar }) => {
  const { user, logout, } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const getUserInitials = () => {
    if (!user || !user.name) return 'U';

    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="relative z-50 bg-gradient-to-r from-black via-neutral-950 to-black border-b border-orange-900/50 shadow-[0_0_20px_rgba(255,100,0,0.2)] h-20 px-6 flex items-center justify-between backdrop-blur-lg">
      {/* Glowing Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,0,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,80,0,0.1),transparent_70%)]"></div>

      {/* Left Side */}
      <div className="flex items-center space-x-4 relative z-10">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-neutral-900/70 border border-orange-700/30 text-orange-400 hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,120,0,0.4)] transition-all duration-300 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent tracking-wide drop-shadow-md animate-pulse-slow">
            Kebele Administration
          </h1>
          <p className="text-sm text-orange-200/80 mt-1 tracking-wider">Ginjo Guduru</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-5 relative z-10">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-neutral-900/70 border border-orange-700/30 text-orange-400 hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,120,0,0.3)] transition-all duration-300">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-red-600/40">
            3
          </span>
        </button>
                    
                <button
          onClick={handleLogout}
          className="p-2 rounded-xl bg-red-900/30 border border-red-700/30 text-red-300 hover:text-red-100 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)] transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
        </button>       
        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 bg-neutral-900/70 border border-orange-700/30 rounded-2xl px-3 py-2 hover:bg-orange-900/20 hover:shadow-[0_0_12px_rgba(255,120,0,0.3)] transition-all duration-300"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-orange-500/30">
              {getUserInitials()}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-orange-100">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || 'Administrator'}</p>
            </div>
            <svg
              className={`w-4 h-4 text-orange-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-neutral-950/90 backdrop-blur-xl border border-orange-900/40 rounded-2xl shadow-[0_0_25px_rgba(255,90,0,0.2)] overflow-hidden animate-fadeIn z-50">
              <div className="px-4 py-3 border-b border-orange-800/40">
                <p className="text-sm font-semibold text-orange-100">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-400">{user?.email || 'admin@example.com'}</p>
              </div>

              <a
                href="/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-orange-900/20 hover:text-orange-300 transition-all duration-200"
              >
                <Settings className="w-4 h-4 text-orange-400" />
                <span>Settings</span>
              </a>

            
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;




