import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import your useAuth hook
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; // Assuming you have a Header component
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/Users";

function App() {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	return (
		<AuthProvider>
			<Router>
				<div>
					{isAuthenticated && (
						<>
							<Header />
							<Sidebar />
						</>
					)}
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/users"
							element={
								<PrivateRoute>
									<Users />
								</PrivateRoute>
							}
						/>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<>Dashboard</>
								</PrivateRoute>
							}
						/>
						{/* Add other protected routes here */}
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
