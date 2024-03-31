// src/components/PrivateRoute.js

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";

const PrivateRoute = ({ children, noSidebar = false }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();


	if (!isAuthenticated) {
		// Redirect them to the /login page, but save the current location they were trying to go to
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return noSidebar ? (
		<>{children}</>
	) : (
		<>
			<div className="col-md-2">
				<Sidebar />
			</div>

			<div className="col-md-9 mx-2">{children}</div>
		</>
	);
};

export default PrivateRoute;
