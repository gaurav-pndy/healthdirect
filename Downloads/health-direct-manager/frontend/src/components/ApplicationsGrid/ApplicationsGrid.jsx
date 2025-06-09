import { FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './ApplicationsGrid.css';

const ApplicationsGrid = ({ onViewChange, currentView, currentTab, onTabChange }) => {
  const applications = [
    { 
      id: 1, 
      name: 'Amanda Chavez', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'new'
    },
    { 
      id: 2, 
      name: 'Randy Elliot', 
      age: 36, 
      gender: 'male',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'progress'
    },
    { 
      id: 3, 
      name: 'Jasmine Palmer', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'finished'
    },
    { 
      id: 4, 
      name: 'Fionna Wade', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'new'
    },
    { 
      id: 5, 
      name: 'Amanda Chavez', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'progress'
    },
    { 
      id: 6, 
      name: 'Randy Elliot', 
      age: 36, 
      gender: 'male',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'finished'
    },
    { 
      id: 7, 
      name: 'Jasmine Palmer', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'new'
    },
    { 
      id: 8, 
      name: 'Fionna Wade', 
      age: 36, 
      gender: 'female',
      service: 'Physiotherapy',
      appointmentDate: '23 Mar 2025',
      timeOfRequest: '10:00 - 10:30',
      applNo: '1234 6546 897',
      status: 'progress'
    }
  ];

  return (
    <div className="applications-grid-container">
      <div className="applications-header">
        <div className="header-left">
          <h2 className="page-title">Applications</h2>
          <p className="page-subtitle">See all the applications</p>
        </div>
        
        <div className="header-right">
          <div className="view-toggle">
            <button 
              className="view-btn"
              onClick={() => onViewChange('list')}
            >
              Compact
            </button>
            <button 
              className="view-btn active"
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
      
      <div className="applications-grid">
        {applications
          .filter(app => app.status === currentTab)
          .map((app) => (
            <div key={app.id} className="application-card">
              <div className="card-header">
                <div className="patient-info">
                  <div className="patient-name">{app.name}</div>
                  <div className="patient-name-sub">{app.name.split(' ')[1]}</div>
                </div>
                <div className="patient-icon-container">
                  <div className="patient-icon">
                    {app.gender === 'male' ? '\u2642' : '\u2640'}
                  </div>
                  <span className={`patient-age ${app.gender === 'male' ? 'male' : 'female'}`}>
                    {app.age}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="service-info">
                  <div className="service-label">Requested Service</div>
                  <div className="service-value">{app.service}</div>
                </div>
                
                <div className="appointment-info">
                  <div className="appointment-row">
                    <div className="appointment-item">
                      <div className="appointment-label">Appointment Date</div>
                      <div className="appointment-value">{app.appointmentDate}</div>
                    </div>
                    <div className="appointment-item">
                      <div className="appointment-label">Time of Request</div>
                      <div className="appointment-value">{app.timeOfRequest}</div>
                    </div>
                  </div>
                </div>
                
                <div className="appl-no">
                  <span className="appl-label">Appl. No: </span>
                  <span className="appl-value">{app.applNo}</span>
                </div>
              </div>
              
              <div className="card-footer">
                <button className={`view-report-btn ${app.status === 'urgent' ? 'urgent' : ''}`}>
                  View Report
                </button>
                
                <div className="contact-actions">
                  <button className="contact-btn phone">
                    <FiPhone />
                  </button>
                  <button className="contact-btn email">
                    <FiMail />
                  </button>
                  <button className="contact-btn whatsapp">
                    <FaWhatsapp />
                  </button>
                  <button className="contact-btn telegram">
                    <FiSend />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationsGrid;