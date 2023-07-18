import React from 'react';
import '../App.css';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">View audience</a>
      <button className="save-segment-button" onClick={toggleSidebar}>
        Save Segment
      </button>
    </nav>
  );
};

export default Navbar;
