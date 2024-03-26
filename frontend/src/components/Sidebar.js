import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className={`d-flex flex-column flex-shrink-0 p-3 ${isCollapsed ? 'collapsed-sidebar' : ''}`} style={{ width: isCollapsed ? '80px' : '280px', height: '100vh', backgroundColor: '#f8f9fa' }}>
            <button className="btn btn-primary mb-3" onClick={toggleSidebar}>
                {isCollapsed ? '>' : '<'}
            </button>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/users" className="nav-link active" aria-current="page">Users</Link>
                </li>
                <li>
                    <Link to="/posts" className="nav-link">Posts</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
