import React from 'react';
import Navbar from './Navbar';

function Home({ toggleSidebar, isOpen }) {
  return (
    <div className={`home ${isOpen ? 'blur' : ''}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <h1>Main Content Area</h1>
      </div>
    </div>
  );
}

export default Home;
