import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct named import

import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";

const Header = () => {
	const { isAuthenticated, logout } = useAuth();
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				fetchUserProfile(decoded.userId);
			} catch (error) {
				console.error("Failed to decode token:", error);
				toast.error("Session invalid. Please log in again.");
			}
		}
	}, [isAuthenticated]);

	const fetchUserProfile = async (userId) => {
		try {
			const { data } = await axios.get(
				`${config.baseUrl}/user/profile/${userId}`
			);
			setUserProfile(data.length ? data[0] : {});
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message
				: "Network error";
			toast.error(errorMessage, {
				position: "bottom-right",
			});
		}
	};

	const handleLogout = () => {
		logout(); // Potentially clear the token from localStorage here as well
	};

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand mb-0 h1">
					Alumnex
				</Link>

				{isAuthenticated ? (
					<div>
						<span style={{ color: "white", marginRight: "20px" }}>
							Hey {userProfile?.name || "there"}
						</span>
						{userProfile?.role !== "Student" && (
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
