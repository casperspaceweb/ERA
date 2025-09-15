import React from 'react';
import { Client } from '../context/EmergencyContext';
import { User, Phone, Mail, Home, Contact, MapPin, Clock } from 'lucide-react';

interface ClientDetailsProps {
  client: Client;
}

export default function ClientDetails({ client }: ClientDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Client Profile</h3>
        <p className="text-sm text-gray-500">Your registered information and emergency contacts</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-400" />
              Personal Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-gray-900">{client.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <div className="mt-1 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{client.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <div className="mt-1 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{client.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <div className="mt-1 flex items-center space-x-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{client.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency & Status */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-gray-900 flex items-center">
              <Contact className="w-5 h-5 mr-2 text-gray-400" />
              Emergency Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="mt-1 text-gray-900">{client.emergencyContact}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Account Status</label>
                <div className="mt-1 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${client.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <p className="text-gray-900 capitalize">{client.status}</p>
                </div>
              </div>
              
              {client.location && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Location</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 text-sm">
                      {client.location.lat.toFixed(4)}, {client.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <div className="mt-1 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-bold">!</span>
            </div>
            <div>
              <h5 className="text-sm font-medium text-blue-900">Important Notice</h5>
              <p className="text-sm text-blue-700 mt-1">
                Keep your contact information updated to ensure we can reach you and your emergency contacts during an emergency. 
                Your location is monitored 24/7 by our security control center.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}