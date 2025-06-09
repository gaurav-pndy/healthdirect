import { useContext, useState, useEffect, useRef } from 'react';
import { FiSearch, FiBell, FiLogOut } from 'react-icons/fi';
import { RiTranslate } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';
import defaultUser from '../../assets/default-user.png'; // Adjust path if needed
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Format the current date and time
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Toggle dropdown on notification icon click
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample notifications (without timestamps)
  const notifications = [
    { id: 1, message: 'New application from Amanda Chavez' },
    { id: 2, message: 'Randy Elliot’s appointment updated' },
    { id: 3, message: 'System maintenance scheduled' },
  ];

  return (
    <header className="header">
      <div className="header-user">
        <div className="user-avatar">
          <img src={defaultUser} alt="User Avatar" />
        </div>
        <div className="user-info">
          <div className="user-name">{user?.email || 'Manager'}</div>
          <div className="user-location">
            Manager's Office - {currentDate} | {currentTime}
          </div>
        </div>
      </div>

      <div className="header-actions">
        <button className="header-btn header-btn-search" title="Search">
          <FiSearch className="header-icon" />
        </button>
        <button className="header-btn header-btn-translate" title="Translate">
          <RiTranslate className="header-icon" />
        </button>
        <div className="notification-container" ref={dropdownRef}>
          <button
            className="header-btn header-btn-bell"
            title="Notifications"
            onClick={toggleDropdown}
          >
            <FiBell className="header-icon" />
          </button>
          {isDropdownOpen && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <span>Notifications</span>
              </div>
              <div className="dropdown-content">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <span className="notification-message">{notification.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="notification-empty">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        <button className="header-btn header-btn-logout" title="Logout" onClick={logout}>
          <FiLogOut className="header-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;