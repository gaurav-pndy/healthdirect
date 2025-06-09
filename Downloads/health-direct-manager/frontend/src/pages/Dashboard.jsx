import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import ApplicationsList from '../components/ApplicationsList/ApplicationsList';
import ApplicationsGrid from '../components/ApplicationsGrid/ApplicationsGrid';

function Dashboard() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'grid'
  const [currentTab, setCurrentTab] = useState('new');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {currentView === 'list' ? (
            <ApplicationsList
              onViewChange={handleViewChange}
              currentView={currentView}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
          ) : (
            <ApplicationsGrid
              onViewChange={handleViewChange}
              currentView={currentView}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;