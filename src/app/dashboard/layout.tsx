import React, { ReactNode } from "react";
import SidebarLayout from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}
 

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <SidebarLayout children={undefined}/>
      <div className="flex flex-col flex-1">
        {/* Main Content */}
        <main className="p-4 bg-white dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
