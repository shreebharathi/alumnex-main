import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth if you need to set authentication state
import logo from "../pages/logo.jpeg";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	const { login, isAuthenticated } = useAuth(); // If you're managing auth state

	useEffect(() => {
		if (isAuthenticated) {
			navigate(
				location.state.from.pathname ? location.state.from.pathname : "/"
			);
		}
	}, [isAuthenticated, navigate, location?.state?.from?.pathname]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(config.baseUrl + "/user/login", {
				email,
				password,
			});
			login(data.token);
			toast.success(data.message, {
				position: "bottom-right",
			});
			navigate("/");
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};

	return (
		<div className="container d-flex w-500 h-300 p-3 mx-auto flex-column">
			<header className="mb-auto">
				<div>
					<h3 className="center-content float-md-start mb-0">
						<img src={logo} alt="Alumnex Forge Logo" height="150" />
					</h3>
				</div>
			</header>
			<div className="container mb-3">
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
					<Link to="/register" className="btn btn-primary">Register</Link> {/* Changed to Link */}
				</form>
			</div>
		</div>
	);
}

export default Login;
