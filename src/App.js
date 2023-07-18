import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import './App.css';
import Home from './components/Home';


const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='App'> 
      <Home toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default App;
