import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
});

export const useAuth = () => {
	const auth = useContext(AuthContext);
	const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);

	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token);
			const currentTime = Date.now() / 1000;

			// Check if the token is expired
			if (decodedToken.exp < currentTime) {
				// Token is expired, logout the user
				setIsAuthenticated(false);
			} else {
				// Token is valid

				setIsAuthenticated(true);
			}
		}
	}, [token]);

	return { ...auth, isAuthenticated };
};
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwtDecode(token);

			const currentTime = Date.now() / 1000;

			// Check if the token is expired
			if (decodedToken.exp < currentTime) {
				// Token is expired, logout the user
				logout();
			} else {
				// Token is valid
				setIsAuthenticated(true);
			}
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("token", token);
		const decodedToken = jwtDecode(token);
		localStorage.setItem("role", decodedToken.role);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setIsAuthenticated(false);
		window.location.reload();
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
