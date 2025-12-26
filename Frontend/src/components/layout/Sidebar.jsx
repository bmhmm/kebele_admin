// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//   Home,
//   UserPlus,
//   Users,
//   Building,
//   IdCard,
//   FileText,
//   List,
//   ListOrdered,
//   // Search, 
//   Settings,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();

//   const navigationItems = [
//     { path: '/', icon: Home, label: 'Dashboard' },
//     { path: '/add-individual', icon: UserPlus, label: 'Add Individual' },
//     { path: '/add-family', icon: Users, label: 'Add Family' },
//     { path: '/add-house', icon: Building, label: 'Add House' },
//     { path: '/add-id-card', icon: IdCard, label: 'Add ID Card' },
//     { path: '/list-id-cards', icon: FileText, label: 'List ID Cards' },
//     { path: '/list-individuals', icon: List, label: 'List Individuals' },
//     { path: '/list-families', icon: ListOrdered, label: 'List Families' },
//     // { path: '/search', icon: Search, label: 'Search' },
//     { path: '/settings', icon: Settings, label: 'Settings' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <div
//       className={`
//         bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
//         text-white transition-all duration-300 ease-in-out h-screen flex flex-col
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         fixed left-0 top-0 z-40 shadow-2xl border-r border-slate-800
//       `}
//     >
//       {/* Header */}
//       <div className="p-6 border-b border-slate-800">
//         <div className={`flex items-center justify-between ${isCollapsed ? 'flex-col space-y-2' : 'flex-row'}`}>
//           <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'flex-row space-x-3'}`}>
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
//               <Building className="w-6 h-6 text-white" />
//             </div>
//             {!isCollapsed && (
//               <div>
//                 <h2 className="text-lg font-bold text-white tracking-wide">Kebele Admin</h2>
//                 <p className="text-xs text-slate-400">Ginjo Guduru</p>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 rounded-lg hover:bg-slate-800/70 hover:text-orange-400 transition-all duration-300"
//           >
//             {isCollapsed ? (
//               <ChevronRight className="w-4 h-4 text-slate-400" />
//             ) : (
//               <ChevronLeft className="w-4 h-4 text-slate-400" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-2">
//           {navigationItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);

//             return (
//               <li key={item.path}>
//                 <NavLink
//                   to={item.path}
//                   className={`
//                     flex items-center rounded-xl px-4 py-3 relative group
//                     font-medium transition-all duration-300 ease-in-out
//                     ${active
//                       ? ' text-white shadow-lg shadow-orange-600/30'
//                       : 'text-slate-300 hover:bg-slate-800/70 hover:text-orange-400 hover:shadow-md hover:shadow-orange-500/10'
//                     }
//                     ${isCollapsed ? 'justify-center' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && (
//                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full shadow-md shadow-orange-400/30" />
//                   )}

//                   <Icon
//                     className={`
//                       transition-all duration-300
//                       ${active ? 'w-6 h-6 text-white' : 'w-5 h-5 text-slate-400 group-hover:text-orange-400'}
//                       ${isCollapsed ? '' : 'mr-3'}
//                     `}
//                   />

//                   {!isCollapsed && (
//                     <span className="text-sm tracking-wide">{item.label}</span>
//                   )}

//                   {/* Tooltip for collapsed state */}
//                   {isCollapsed && (
//                     <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
//                       {item.label}
//                     </div>
//                   )}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-slate-800">
//         <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
//           {!isCollapsed && (
//             <div className="text-xs text-slate-500">
//               <p>v1.0.0</p>
//               <p>© 2024 Kebele Admin</p>
//             </div>
//           )}
//           <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-600/40">
//             AM
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;












// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//   Home,
//   UserPlus,
//   Users,
//   Building,
//   IdCard,
//   FileText,
//   List,
//   ListOrdered,
//   Settings,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();
//   const { user } = useAuth();

//   const getNavigationItems = () => {
//     const allItems = [
//       { path: '/', icon: Home, label: 'Dashboard', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
//       { path: '/add-individual', icon: UserPlus, label: 'Add Individual', roles: ['Administrator', 'Data Entry Clerk'] },
//       { path: '/add-family', icon: Users, label: 'Add Family', roles: ['Administrator', 'Data Entry Clerk'] },
//       { path: '/add-house', icon: Building, label: 'Add House', roles: ['Administrator', 'Data Entry Clerk'] },
//       { path: '/add-id-card', icon: IdCard, label: 'Add ID Card', roles: ['Administrator', 'Data Entry Clerk'] },
//       { path: '/list-id-cards', icon: FileText, label: 'List ID Cards', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
//       { path: '/list-individuals', icon: List, label: 'List Individuals', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
//       { path: '/list-families', icon: ListOrdered, label: 'List Families', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
//       { path: '/settings', icon: Settings, label: 'Settings', roles: ['Administrator'] },
//     ];

//     return allItems.filter(item => item.roles.includes(user?.role || 'View Only'));
//   };

//   const isActive = (path) => {
//     if (path === '/') {
//       return location.pathname === '/';
//     }
//     return location.pathname.startsWith(path);
//   };

//   const navigationItems = getNavigationItems();

//   return (
//     <div
//       className={`
//         bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
//         text-white transition-all duration-300 ease-in-out h-screen flex flex-col
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         fixed left-0 top-0 z-40 shadow-2xl border-r border-slate-800
//       `}
//     >
//       {/* Header */}
//       <div className="p-6 border-b border-slate-800">
//         <div className={`flex items-center justify-between ${isCollapsed ? 'flex-col space-y-2' : 'flex-row'}`}>
//           <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'flex-row space-x-3'}`}>
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
//               <Building className="w-6 h-6 text-white" />
//             </div>
//             {!isCollapsed && (
//               <div>
//                 <h2 className="text-lg font-bold text-white tracking-wide">Kebele Admin</h2>
//                 <p className="text-xs text-slate-400">Ginjo Guduru</p>
//                 {user?.role && (
//                   <p className="text-xs text-orange-400 mt-1">
//                     {user.role === 'Administrator' ? '👑 Admin' :
//                       user.role === 'Data Entry Clerk' ? '📝 Data Entry' :
//                         '👁️ View Only'}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 rounded-lg hover:bg-slate-800/70 hover:text-orange-400 transition-all duration-300"
//           >
//             {isCollapsed ? (
//               <ChevronRight className="w-4 h-4 text-slate-400" />
//             ) : (
//               <ChevronLeft className="w-4 h-4 text-slate-400" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-2">
//           {navigationItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);

//             return (
//               <li key={item.path}>
//                 <NavLink
//                   to={item.path}
//                   className={`
//                     flex items-center rounded-xl px-4 py-3 relative group
//                     font-medium transition-all duration-300 ease-in-out
//                     ${active
//                       ? ' text-white shadow-lg shadow-orange-600/30'
//                       : 'text-slate-300 hover:bg-slate-800/70 hover:text-orange-400 hover:shadow-md hover:shadow-orange-500/10'
//                     }
//                     ${isCollapsed ? 'justify-center' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && (
//                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full shadow-md shadow-orange-400/30" />
//                   )}

//                   <Icon
//                     className={`
//                       transition-all duration-300
//                       ${active ? 'w-6 h-6 text-white' : 'w-5 h-5 text-slate-400 group-hover:text-orange-400'}
//                       ${isCollapsed ? '' : 'mr-3'}
//                     `}
//                   />

//                   {!isCollapsed && (
//                     <span className="text-sm tracking-wide">{item.label}</span>
//                   )}

//                   {/* Tooltip for collapsed state */}
//                   {isCollapsed && (
//                     <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
//                       {item.label}
//                     </div>
//                   )}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-slate-800">
//         <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
//           {!isCollapsed && (
//             <div className="text-xs text-slate-500">
//               <p>v1.0.0</p>
//               <p>© 2024 Kebele Admin</p>
//               <p className="mt-1 text-orange-400/70">{user?.email}</p>
//             </div>
//           )}
//           <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-600/40">
//             {user?.name?.charAt(0) || 'U'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;








import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  UserPlus,
  Users,
  Building,
  IdCard,
  FileText,
  List,
  ListOrdered,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const allItems = [
      { path: '/', icon: Home, label: 'Dashboard', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
      { path: '/add-individual', icon: UserPlus, label: 'Add Individual', roles: ['Administrator', 'Data Entry Clerk'] },
      { path: '/add-family', icon: Users, label: 'Add Family', roles: ['Administrator', 'Data Entry Clerk'] },
      { path: '/add-house', icon: Building, label: 'Add House', roles: ['Administrator', 'Data Entry Clerk'] },
      { path: '/add-id-card', icon: IdCard, label: 'Add ID Card', roles: ['Administrator', 'Data Entry Clerk'] },
      { path: '/list-id-cards', icon: FileText, label: 'List ID Cards', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
      { path: '/list-individuals', icon: List, label: 'List Individuals', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
      { path: '/list-families', icon: ListOrdered, label: 'List Families', roles: ['Administrator', 'Data Entry Clerk', 'View Only'] },
      { path: '/settings', icon: Settings, label: 'Settings', roles: ['Administrator'] },
    ];

    return allItems.filter(item => item.roles.includes(user?.role || 'View Only'));
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navigationItems = getNavigationItems();

  return (
    <div
      className={`
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        text-white transition-all duration-300 ease-in-out h-screen flex flex-col
        ${isCollapsed ? 'w-16' : 'w-64'}
        fixed left-0 top-0 z-40 shadow-2xl border-r border-slate-800
      `}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className={`flex items-center justify-between ${isCollapsed ? 'flex-col space-y-2' : 'flex-row'}`}>
          <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'flex-row space-x-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
              <Building className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">Kebele Admin</h2>
                <p className="text-xs text-slate-400">Ginjo Guduru</p>
                {user?.role && (
                  <p className="text-xs text-orange-400 mt-1">
                    {user.role === 'Administrator' ? '👑 Admin' :
                      user.role === 'Data Entry Clerk' ? '📝 Data Entry' :
                        '👁️ View Only'}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-800/70 hover:text-orange-400 transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`
                    flex items-center rounded-xl px-4 py-3 relative group
                    font-medium transition-all duration-300 ease-in-out
                    ${active
                      ? ' text-white shadow-lg shadow-orange-600/30'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-orange-400 hover:shadow-md hover:shadow-orange-500/10'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full shadow-md shadow-orange-400/30" />
                  )}

                  <Icon
                    className={`
                      transition-all duration-300
                      ${active ? 'w-6 h-6 text-white' : 'w-5 h-5 text-slate-400 group-hover:text-orange-400'}
                      ${isCollapsed ? '' : 'mr-3'}
                    `}
                  />

                  {!isCollapsed && (
                    <span className="text-sm tracking-wide">{item.label}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="text-xs text-slate-500">
              <p>v1.0.0</p>
              <p>© 2024 Kebele Admin</p>
              <p className="mt-1 text-orange-400/70 truncate max-w-[180px]">{user?.email}</p>
              <button
                onClick={logout}
                className="mt-2 flex items-center gap-1 text-slate-400 hover:text-red-400 transition hover:bg-red-900/20 px-2 py-1 rounded"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          )}
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-600/40">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;