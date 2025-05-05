"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Sidebar Toggle Button */}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 dark:bg-gray-800">
          {/* Mobile-only Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute text-gray-400 top-2 right-2 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white sm:hidden"
          >
            <Icon icon="mdi:close" className="w-5 h-5" />
          </button>

          {/* Sidebar items */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:view-kanban"
                  className="w-5 h-5 text-gray-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-900 group"
              >
                <Icon
                  icon="mdi:inbox"
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-200 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-100">
                  Inbox
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ms-3 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:account-group"
                  className="w-5 h-5 text-gray-400   group-hover:text-gray-200 dark:group-hover:text-white"
                />
                <Link
                  href="/dashboard/users"
                  className="flex-1 ms-3 whitespace-nowrap text-gray-100"
                >
                  Users
                </Link>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700 group"
              >
                <Icon
                  icon="mdi:package-variant"
                  className="w-5 h-5 text-gray-400 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700  group">
                <Icon
                  icon="mdi:login"
                  className="w-5 h-5 text-gray-400 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-100">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content Area */}
      <div className="h-screen sm:ml-72">{children}</div>
    </div>
  );
};

export default SidebarLayout;
