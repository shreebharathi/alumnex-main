import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import your useAuth hook
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; // Assuming you have a Header component
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/Users";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<AuthProvider>
			<Router>
			<ToastContainer />
			<Header />
				<div className="container-fluid">
					<div className="row">
						{isAuthenticated && (
							<div className="col-md-2">
								
								<Sidebar />
							</div>
						)}
						<div className="col-md-9">
							<Routes>
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route
									path="/"
									element={
										<PrivateRoute>
											<>Dashboard</>
										</PrivateRoute>
									}
								/>
								<Route
									path="/users"
									element={
										<PrivateRoute>
											<Users />
										</PrivateRoute>
									}
								/>
								
								{/* Add other protected routes here */}
							</Routes>
						</div>
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
