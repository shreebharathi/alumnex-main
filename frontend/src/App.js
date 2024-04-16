import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Import your useAuth hook

import Header from "./components/Header"; // Assuming you have a Header component
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/Events";
import Newsletter from "./pages/Newsletter";
import Internships from "./pages/Internships";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
	const role = localStorage.getItem("role");

	return (
		<AuthProvider>
			<Router>
				<ToastContainer />
				<Header />
				<div className="container-fluid">
					<div className="row">
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route
								path="/"
								element={
									<PrivateRoute noSidebar={true}>
										<Home />
									</PrivateRoute>
								}
							/>

							{["Admin", "Alumni", "Staff"].includes(role) && (
								<Route path="admin">
									<Route
										path="dashboard"
										element={
											<PrivateRoute>
												<Dashboard />
											</PrivateRoute>
										}
									/>
									{["Admin", "Staff"].includes(role) && (
										<>
											<Route
												path="users"
												element={
													<PrivateRoute>
														<Users />
													</PrivateRoute>
												}
											/>
											<Route
												path="events"
												element={
													<PrivateRoute>
														<Events />
													</PrivateRoute>
												}
											/>
											<Route
												path="newsletters"
												element={
													<PrivateRoute>
														<Newsletter />
													</PrivateRoute>
												}
											/>
										</>
									)}

									<Route
										path="internships"
										element={
											<PrivateRoute>
												<Internships />
											</PrivateRoute>
										}
									/>
								</Route>
							)}
							<Route
								path="*"
								element={
									<PrivateRoute>
										<></>
									</PrivateRoute>
								}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
