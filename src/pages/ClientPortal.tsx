import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import EmergencyButtons from '../components/EmergencyButtons';
import LocationMap from '../components/LocationMap';
import ClientDetails from '../components/ClientDetails';
import Navigation from '../components/Navigation';
import { MapPin, User, Phone, Mail, Home, Contact } from 'lucide-react';

export default function ClientPortal() {
  const { currentClient } = useEmergency();
  const [activeTab, setActiveTab] = useState<'map' | 'profile'>('map');

  if (!currentClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading client information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentClient.name}</h1>
                <p className="text-sm text-gray-500">Emergency Response Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${currentClient.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700 capitalize">{currentClient.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Buttons - Always Visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmergencyButtons />
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('map')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'map'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Live Location
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              My Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Current Location</h3>
                <p className="text-sm text-gray-500">Your live position is being monitored</p>
              </div>
              <LocationMap />
            </div>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Quick Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{currentClient.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{currentClient.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{currentClient.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Contact className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{currentClient.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ClientDetails client={currentClient} />
        )}
      </div>
    </div>
  );
}