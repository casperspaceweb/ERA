import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle, Car, HelpCircle, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';

export default function AlertDashboard() {
  const { alerts, clients, acknowledgeAlert, resolveAlert } = useEmergency();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'panic':
        return AlertTriangle;
      case 'accident':
        return Car;
      case 'assistance':
        return HelpCircle;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type: string, status: string) => {
    if (status === 'resolved') return 'text-gray-400 bg-gray-50';
    if (status === 'acknowledged') return 'text-yellow-600 bg-yellow-50';
    
    switch (type) {
      case 'panic':
        return 'text-red-600 bg-red-50';
      case 'accident':
        return 'text-orange-600 bg-orange-50';
      case 'assistance':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const acknowledgedAlerts = alerts.filter(alert => alert.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b bg-red-50">
          <h3 className="text-lg font-medium text-red-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Active Alerts ({activeAlerts.length})
          </h3>
          <p className="text-sm text-red-700 mt-1">Requires immediate attention</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {activeAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
              <p className="text-gray-500">All systems operational</p>
            </div>
          ) : (
            activeAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              const client = clients.find(c => c.id === alert.clientId);
              
              return (
                <div key={alert.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAlertColor(alert.type, alert.status)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 capitalize">
                          {alert.type} Alert
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{getClientName(alert.clientId)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{alert.timestamp.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>
                              Lat: {alert.location.lat.toFixed(4)}, Lng: {alert.location.lng.toFixed(4)}
                            </span>
                          </div>
                          {client?.phone && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span className="font-medium">Phone:</span>
                              <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
                                {client.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acknowledged Alerts */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-yellow-50">
            <h3 className="text-lg font-medium text-yellow-900">
              Acknowledged ({acknowledgedAlerts.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {acknowledgedAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 capitalize">{alert.type}</p>
                      <p className="text-sm text-gray-500">{getClientName(alert.clientId)}</p>
                      <p className="text-xs text-gray-400">{alert.timestamp.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolved Alerts */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-green-50">
            <h3 className="text-lg font-medium text-green-900">
              Resolved ({resolvedAlerts.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {resolvedAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-600 capitalize">{alert.type}</p>
                      <p className="text-sm text-gray-500">{getClientName(alert.clientId)}</p>
                      <p className="text-xs text-gray-400">{alert.timestamp.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
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