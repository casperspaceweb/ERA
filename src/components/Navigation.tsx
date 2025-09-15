import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  isAdmin?: boolean;
}

export default function Navigation({ isAdmin }: NavigationProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <span className="text-xl font-bold text-gray-900">SecureAlert</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{user?.email}</span>
            </div>
            
            {!isAdmin && (
              <Link
                to="/client"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/client'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Client Portal
              </Link>
            )}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Portal
              </Link>
            )}
            
            <button
              onClick={handleSignOut}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}