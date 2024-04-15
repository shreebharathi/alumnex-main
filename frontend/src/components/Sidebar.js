import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
	const role = localStorage.getItem("role");

	return (
		<div
			className={`d-flex flex-column flex-shrink-0 p-3`}
			style={{ width: "280px", height: "100vh", backgroundColor: "#f8f9fa" }}
		>
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link to="/admin/dashboard" className="nav-link" aria-current="page">
						Dashboard
					</Link>
				</li>
				{["Admin", "Staff"].includes(role) && (
					<>
						<li className="nav-item">
							<Link to="/admin/users" className="nav-link" aria-current="page">
								Users
							</Link>
						</li>
						<li>
							<Link to="/admin/events" className="nav-link">
								Events
							</Link>
						</li>
						<li>
							<Link to="/admin/newsletters" className="nav-link">
								Newsletters
							</Link>
						</li>
					</>
				)}
				<li>
					<Link to="/admin/internships" className="nav-link">
						Internships
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
