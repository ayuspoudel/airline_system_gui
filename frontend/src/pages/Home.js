import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Airline Management System</h1>
      <nav>
        <ul>
          <li><Link to="/crud/members">Manage Members</Link></li>
          <li><Link to="/query">Query Tables</Link></li>
          <li><Link to="/report">View Reports</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;

