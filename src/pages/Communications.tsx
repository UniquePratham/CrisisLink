import React, { useState } from 'react';
import { Radio, Send, Phone, MessageSquare, AlertTriangle, Users } from 'lucide-react';
import { AlertModal } from '../components/Modal';
import { useAlertModal } from '../hooks/useModal';

const channels = [
  { id: 1, name: 'Dispatch', active: true, users: 12 },
  { id: 2, name: 'Fire Operations', active: true, users: 8 },
  { id: 3, name: 'Medical Response', active: false, users: 5 },
  { id: 4, name: 'Police Coordination', active: true, users: 15 },
];

const messages = [
  {
    id: 1,
    sender: 'Dispatch Central',
    channel: 'Dispatch',
    message: 'All units, structure fire reported at 123 Main Street. Engine 12 and Rescue 8 respond.',
    timestamp: '14:35:22',
    priority: 'high'
  },
  {
    id: 2,
    sender: 'Engine 12',
    channel: 'Fire Operations',
    message: 'Engine 12 on scene. Working structure fire, requesting additional units.',
    timestamp: '14:33:15',
    priority: 'high'
  },
  {
    id: 3,
    sender: 'Ambulance 5',
    channel: 'Medical Response',
    message: 'Ambulance 5 clear, returning to service.',
    timestamp: '14:30:45',
    priority: 'normal'
  },
  {
    id: 4,
    sender: 'Unit 23',
    channel: 'Police Coordination',
    message: 'Unit 23 establishing traffic control at Highway 101 and 5th Avenue.',
    timestamp: '14:28:30',
    priority: 'normal'
  }
];

export const Communications: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState('Dispatch');
  const [newMessage, setNewMessage] = useState('');
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const filteredMessages = messages.filter(msg => msg.channel === selectedChannel);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      showAlert('Message Sent', `Message sent to ${selectedChannel}: ${newMessage}`, 'success');
      setNewMessage('');
    }
  };

  const handleEmergencyBroadcast = () => {
    showAlert('Emergency Broadcast', 'Emergency broadcast initiated to all channels!', 'warning');
  };

  const handleContactPerson = (name: string, number: string) => {
    showAlert('Calling Contact', `Calling ${name} at ${number}`, 'info');
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Communications Hub</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Coordinate with response teams and dispatch</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleEmergencyBroadcast}
              className="bg-crisis-600 text-white px-4 py-2 rounded-lg hover:bg-crisis-700 transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Broadcast</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Channels Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300">
              <div className="p-4 border-b border-light-border-primary dark:border-dark-border-primary">
                <h2 className="font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center space-x-2">
                  <Radio className="h-5 w-5" />
                  <span>Active Channels</span>
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedChannel === channel.name
                        ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{channel.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          channel.active ? 'bg-green-500' : 'bg-light-text-tertiary dark:bg-dark-text-tertiary'
                        }`}></div>
                        <span className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">{channel.users}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary h-96 flex flex-col transition-colors duration-300">
              {/* Chat Header */}
              <div className="p-4 border-b border-light-border-primary dark:border-dark-border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{selectedChannel}</h3>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    <Users className="h-4 w-4" />
                    <span>{channels.find(c => c.name === selectedChannel)?.users || 0} users</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Radio className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{message.sender}</span>
                        <span className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">{message.timestamp}</span>
                        {message.priority === 'high' && (
                          <span className="bg-crisis-100 dark:bg-crisis-900/30 text-crisis-700 dark:text-crisis-300 px-2 py-1 rounded-full text-xs">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-light-border-primary dark:border-dark-border-primary">
                <form onSubmit={handleSendMessage} className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Send message to ${selectedChannel}...`}
                    className="flex-1 px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Emergency Contacts</h3>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => handleContactPerson('Fire Chief', '(555) 911-0001')}
                className="w-full text-left p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary rounded transition-colors"
              >
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">Fire Chief</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">(555) 911-0001</p>
              </button>
              <button 
                onClick={() => handleContactPerson('Police Commander', '(555) 911-0002')}
                className="w-full text-left p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary rounded transition-colors"
              >
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">Police Commander</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">(555) 911-0002</p>
              </button>
              <button 
                onClick={() => handleContactPerson('EMS Director', '(555) 911-0003')}
                className="w-full text-left p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary rounded transition-colors"
              >
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">EMS Director</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">(555) 911-0003</p>
              </button>
            </div>
          </div>

          <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Recent Alerts</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-crisis-50 dark:bg-crisis-900/20 rounded">
                <p className="text-sm font-medium text-crisis-800 dark:text-crisis-200">Structure Fire Alert</p>
                <p className="text-xs text-crisis-600 dark:text-crisis-400">2 minutes ago</p>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Weather Warning</p>
                <p className="text-xs text-amber-600 dark:text-amber-400">15 minutes ago</p>
              </div>
            </div>
          </div>

          <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <Radio className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Radio Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Primary Channel</span>
                <span className="text-green-600 dark:text-green-400 text-sm">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Backup Channel</span>
                <span className="text-green-600 dark:text-green-400 text-sm">Standby</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Emergency Frequency</span>
                <span className="text-green-600 dark:text-green-400 text-sm">Clear</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={closeAlert}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </>
  );
};