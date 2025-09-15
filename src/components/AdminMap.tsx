import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { MapPin, AlertTriangle, Users, Circle } from 'lucide-react';

export default function AdminMap() {
  const { clients, alerts } = useEmergency();
  
  const activeClients = clients.filter(client => client.status === 'active' && client.location);
  const activeAlerts = alerts.filter(alert => alert.status === 'active');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map View */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Live Client Map</h3>
            <p className="text-sm text-gray-500">Real-time locations and alerts</p>
          </div>
          
          <div className="relative">
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>
              
              {/* Mock Streets */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
                <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-30"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30"></div>
              </div>

              {/* Client Locations */}
              {activeClients.map((client, index) => {
                const hasAlert = activeAlerts.some(alert => alert.clientId === client.id);
                const positions = [
                  { top: '20%', left: '30%' },
                  { top: '60%', left: '70%' },
                  { top: '40%', left: '50%' },
                  { top: '30%', left: '20%' },
                  { top: '70%', left: '80%' },
                ];
                const position = positions[index % positions.length];
                
                return (
                  <div
                    key={client.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: position.top, left: position.left }}
                  >
                    <div className="relative group">
                      <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${
                        hasAlert ? 'bg-red-600 animate-pulse' : 'bg-blue-600'
                      }`}>
                        {hasAlert ? (
                          <AlertTriangle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs">{client.phone}</p>
                          {hasAlert && <p className="text-red-300 text-xs">⚠️ ACTIVE ALERT</p>}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                      </div>
                      
                      {/* Pulsing circle for alerts */}
                      {hasAlert && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-200 rounded-full animate-ping opacity-75"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-medium text-gray-900">Map Legend</h4>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-gray-700">Active Client</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-gray-700">Client with Alert</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-gray-700">Inactive Client</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-medium text-gray-900">Live Statistics</h4>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Online</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{activeClients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-700">Alerts</span>
              </div>
              <span className="text-lg font-bold text-red-600">{activeAlerts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Tracked</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {clients.filter(c => c.location).length}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-medium text-gray-900">Recent Activity</h4>
          </div>
          <div className="p-4 space-y-3">
            {alerts.slice(0, 5).map((alert) => {
              const client = clients.find(c => c.id === alert.clientId);
              return (
                <div key={alert.id} className="flex items-center space-x-3">
                  <Circle className={`w-2 h-2 ${
                    alert.status === 'active' ? 'text-red-500 fill-current' :
                    alert.status === 'acknowledged' ? 'text-yellow-500 fill-current' : 
                    'text-green-500 fill-current'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{client?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{alert.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}