import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import '../styles/layout.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
