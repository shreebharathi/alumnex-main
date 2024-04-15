import React from "react";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from AuthContext
import { Link } from "react-router-dom";

const Header = () => {
	const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout from AuthContext
	const role = localStorage.getItem("role");

	const handleLogout = () => {
		logout(); // Call the logout function from AuthContext
		// Optionally, redirect the user to the login page or perform other actions after logout
	};
	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">Alumnex</span>

				{isAuthenticated ? (
					<div>
						{role !== "Student" && (
							<Link to="/admin/dashboard" className="btn btn-outline-light">
								Admin
							</Link>
						)}
						<button className="btn btn-outline-light" onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<Link to="/login" className="btn btn-outline-light">
						Login
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Header;
