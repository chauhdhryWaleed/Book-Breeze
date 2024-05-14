import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiBook, FiLayers, FiLogOut } from 'react-icons/fi'; // Import Feather icons

function Sidebar() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="w-1/4  py-4 overflow-y-auto bg-emerald-400 dark:bg-gray-800"
      >
        <div className="px-3">
          <ul className="space-y-4 font-medium"> {/* Increased space-y */}
            <li>
              <Link
                to="/adminSidebar/dashboard"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiHome className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-4">Dashboard</span> {/* Increased margin */}
              </Link>
            </li>
            <li>
              <Link
                to="/adminSidebar/addBook"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiBook className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-4">Add Books</span> {/* Increased margin */}
              </Link>
            </li>
            <li>
              <Link
                to="/adminSidebar/manageBook"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiLayers className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-4">Manage Inventory</span> {/* Increased margin */}
              </Link>
            </li>
            {/* Sign out button */}
            <li>
              <Link
                to="/home"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiLogOut className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-4">Sign Out</span> {/* Increased margin */}
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
