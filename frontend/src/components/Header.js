import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "../contexts/AuthContext"; // Import useAuth from AuthContext
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";

const Header = () => {
	const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout from AuthContext
	const [userProfile, setUserProfile] = useState();

	const decoded = jwtDecode(localStorage.getItem("token"));

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const fetchUserProfile = async () => {
		try {
			const { data } = await axios.get(
				config.baseUrl + `/user/profile/${decoded.userId}`
			);
			setUserProfile(() => (data.length ? data[0] : {}));
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};
	console.log(userProfile);
	const handleLogout = () => {
		logout(); // Call the logout function from AuthContext
		// Optionally, redirect the user to the login page or perform other actions after logout
	};
	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand mb-0 h1">
					Alumnex
				</Link>

				{isAuthenticated ? (
					<div>
						<span
							style={{
								color: "white",
								marginRight: "20px",
							}}
						>
							Hey {userProfile?.name}
						</span>
						{decoded.role !== "Student" && (
							<Link to="/admin/dashboard" className="btn btn-outline-light">
								Admin Panel
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
