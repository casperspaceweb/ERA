import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

export default function LocationMap() {
  const { currentClient, updateLocation } = useEmergency();

  const refreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get location. Please check your browser settings.');
        }
      );
    }
  };

  if (!currentClient?.location) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Location Not Available</h3>
          <p className="text-gray-500 mb-4">Enable location services to see your position</p>
          <button
            onClick={refreshLocation}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Enable Location
          </button>
        </div>
      </div>
    );
  }

  // Check if location is default (0,0) - means no real location set
  const hasRealLocation = currentClient.location.lat !== 0 || currentClient.location.lng !== 0;

  if (!hasRealLocation) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Location Not Available</h3>
          <p className="text-gray-500 mb-4">Enable location services to see your position</p>
          <button
            onClick={refreshLocation}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Enable Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center overflow-hidden">
        {/* Simulated Map Interface */}
        <div className="relative w-full h-full">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Current Location Pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-md border">
                <p className="text-xs font-medium text-gray-700">You are here</p>
              </div>
              {/* Pulsing circle animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-200 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          {/* Mock Streets */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Current Location</p>
            <p className="text-xs text-gray-500">
              Lat: {currentClient.location.lat.toFixed(6)}, Lng: {currentClient.location.lng.toFixed(6)}
            </p>
          </div>
          <button
            onClick={refreshLocation}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Refresh location"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}