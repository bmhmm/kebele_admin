import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => setMobileSidebarOpen(false), [location]);

  const toggleSidebar = () => {
    if (isMobile) setMobileSidebarOpen(!mobileSidebarOpen);
    else setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-64";
  const mainContentMargin = isMobile ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64";

  return (
    <div className="min-h-screen relative overflow-hidden text-white transition-all duration-300 ease-in-out">
      {/* 🌫️ Animated Slate Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 overflow-hidden">
        {/* Glowing gradient orbs */}
        <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-gradient-to-br from-slate-700/30 via-slate-600/20 to-transparent rounded-full blur-[140px] animate-slow-rotate" />
        <div className="absolute bottom-[-300px] right-[-250px] w-[800px] h-[800px] bg-gradient-to-tr from-slate-800/25 via-slate-700/20 to-transparent rounded-full blur-[150px] animate-reverse-rotate" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)] blur-3xl" />

        {/* Floating subtle light particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-slate-300/40 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.25 + Math.random() * 0.4,
            }}
          ></span>
        ))}
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 transform transition-all duration-500 ease-in-out
          ${isMobile ? (mobileSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${sidebarWidth}
          shadow-[0_0_40px_rgba(255,255,255,0.08)]
        `}
      >
        <Sidebar
          isCollapsed={isMobile ? false : sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobile && mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm transition-all duration-500"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className={`relative min-h-screen transition-all duration-500 ease-in-out ${mainContentMargin} z-10`}
      >
        <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <main className="p-6 relative z-10">
          <div key={location.pathname} className="page-fade">
            {children}
          </div>
        </main>
      </div>

      {/* ✨ Custom Animations */}
      <style jsx>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slowRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes reverseRotate {
          0% {
            transform: rotate(360deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        .animate-slow-rotate {
          animation: slowRotate 100s linear infinite;
        }

        .animate-reverse-rotate {
          animation: reverseRotate 140s linear infinite;
        }

        .page-fade {
          animation: fadeInSlide 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Layout;
