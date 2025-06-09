import { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import './ApplicationsList.css';

const ApplicationsList = ({ onViewChange, currentView, currentTab, onTabChange }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const applications = [
    { id: 1, name: 'Amanda Chavez', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'new' },
    { id: 2, name: 'Randy Elliot', age: 36, phone: '1234 6546 897', gender: 'male', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'progress' },
    { id: 3, name: 'Jasmine Palmer', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'finished' },
    { id: 4, name: 'Fionna Wade', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'new' },
    { id: 5, name: 'Amanda Chavez', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'progress' },
    { id: 6, name: 'Randy Elliot', age: 36, phone: '1234 6546 897', gender: 'male', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'finished' },
    { id: 7, name: 'Jasmine Palmer', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'new' },
    { id: 8, name: 'Fionna Wade', age: 36, phone: '1234 6546 897', gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', status: 'progress' },
  ];

  const handlePatientClick = (id) => {
    setSelectedPatientId(id === selectedPatientId ? null : id);
  };

  return (
    <div className="applications-container">
      <div className="applications-header">
        <div className="header-left">
          <h2 className="page-title">Applications</h2>
          <p className="page-subtitle">See all the applications</p>
        </div>
        
        <div className="header-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => onViewChange('list')}
            >
              Compact
            </button>
            <button 
              className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
              onClick={() => onViewChange('grid')}
            >
              Expanded
            </button>
          </div>
        </div>
      </div>
      
      <div className="applications-tabs">
        <button 
          className={`tab-btn ${currentTab === 'new' ? 'active' : ''}`}
          onClick={() => onTabChange('new')}
        >
          New
        </button>
        <button 
          className={`tab-btn ${currentTab === 'progress' ? 'active' : ''}`}
          onClick={() => onTabChange('progress')}
        >
          Progress
        </button>
        <button 
          className={`tab-btn ${currentTab === 'finished' ? 'active' : ''}`}
          onClick={() => onTabChange('finished')}
        >
          Finished
        </button>
      </div>
      
      <div className="applications-list">
        {applications
          .filter(app => app.status === currentTab)
          .map((app) => (
            <div
              key={app.id}
              className={`application-item ${app.status === 'urgent' ? 'urgent' : ''} ${
                selectedPatientId === app.id ? 'selected' : ''
              }`}
              onClick={() => handlePatientClick(app.id)}
            >
              <div className="app-info">
                <h3 className="app-name">{app.name}</h3>
              </div>
              
              <div className="app-actions">
                <div className="app-details">
                  <div className="detail-item">
                    <FiFileText className="detail-icon" />
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">
                      {app.gender === 'male' ? '\u2642' : '\u2640'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="age-text">{app.age} Yrs</span>
                  </div>
                  <div className="detail-item">
                    <span className="phone-text">{app.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationsList;