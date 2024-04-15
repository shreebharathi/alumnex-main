import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle registration logic here
		console.log("Register with:");
		try {
			const { data } = await axios.post(config.baseUrl + "/user/register", {
				name,
				role,
				email,
				password,
				phone,
			});

			toast.success(data.message, {
				position: "bottom-right",
			});
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};

	return (
		<div className="container">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="role" className="form-label">
						Role
					</label>
					<select
						className="form-control"
						value={role}
						onChange={(e) => setRole(e.target.value)}
					>
						<option value="Alumni">Alumni</option>
						<option value="Student">Student</option>
						<option value="Staff">Faculty</option>
					</select>
				</div>
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
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">
						Phone
					</label>
					<input
						type="tel"
						className="form-control"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
