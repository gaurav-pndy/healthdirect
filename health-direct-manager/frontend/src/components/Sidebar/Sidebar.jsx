import { 
  FiGrid, 
  FiCalendar, 
  FiUsers, 
  FiUser, 
  FiFileText, 
  FiMessageSquare,
  FiPhone
} from 'react-icons/fi';
import logo from '../../assets/logo.png'; // Import the logo
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Health Direct Logo" className="sidebar-logo" />
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item active">
          <FiGrid className="nav-icon" />
          <span>Applications</span>
        </div>
        
        <div className="nav-item">
          <FiCalendar className="nav-icon" />
          <span>Calendar</span>
        </div>
        
        <div className="nav-item">
          <FiUsers className="nav-icon" />
          <span>Patients</span>
        </div>
        
        <div className="nav-item">
          <FiUser className="nav-icon" />
          <span>Doctors</span>
        </div>
        
        <div className="nav-item">
          <FiFileText className="nav-icon" />
          <span>Reports</span>
        </div>
        
        <div className="nav-item">
          <FiMessageSquare className="nav-icon" />
          <span>Messenger</span>
        </div>
        
        <div className="nav-item">
          <FiUser className="nav-icon" />
          <span>Profile</span>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="help-desk">
          <div className="help-icon">
            <FiPhone />
          </div>
          <div className="help-info">
            <div className="help-title">Help Desk</div>
            <div className="help-number">+123 456 789</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;