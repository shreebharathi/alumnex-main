import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
   
    return (
        <div className={`d-flex flex-column flex-shrink-0 p-3`} style={{ width: '280px', height: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link" aria-current="page">Users</Link>
                </li>
                <li>
                    <Link to="/posts" className="nav-link">Posts</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
