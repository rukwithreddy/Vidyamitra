import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/layout.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Dashboard Layout Component
 * Provides consistent layout structure with navbar, sidebar, and main content area
 * Used by all authenticated pages
 */
function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
