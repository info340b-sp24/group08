import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>InterStu Spot</h1>
        <nav aria-label="Main navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listings">Job Listings</Link></li>
                <li><Link to="/discussion">Discussion Board</Link></li>
                <li><Link to="/visa">Visa Information</Link></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;