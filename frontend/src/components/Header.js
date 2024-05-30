import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  // Correct named import

import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";

const Header = () => {
<<<<<<< HEAD
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
=======
	const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout from AuthContext
	const [userProfile, setUserProfile] = useState();
 const token = localStorage.getItem("token")
	const decoded = jwtDecode(token? token : "");
>>>>>>> fabd43edd925241250c7fc7da57368c9f7c5b2ab

    const fetchUserProfile = async (userId) => {
        try {
            const { data } = await axios.get(`${config.baseUrl}/user/profile/${userId}`);
            setUserProfile(data.length ? data[0] : {});
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "Network error";
            toast.error(errorMessage, {
                position: "bottom-right",
            });
        }
    };

<<<<<<< HEAD
    const handleLogout = () => {
        logout(); // Potentially clear the token from localStorage here as well
    };
=======
	const fetchUserProfile = async () => {
		try {
			const { data } = await axios.get(
				config.baseUrl + `/user/profile/${decoded?.userId}`
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
>>>>>>> fabd43edd925241250c7fc7da57368c9f7c5b2ab

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1">Alumnex</Link>

                {isAuthenticated ? (
                    <div>
                        <span style={{ color: "white", marginRight: "20px" }}>
                            Hey {userProfile?.name || 'there'}
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
