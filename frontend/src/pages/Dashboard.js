/* Dashboard.js */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Ensure you style the cards and text appropriately

// Importing stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import config from "../config";

const Dashboard = () => {
	const [metrics, setMetrics] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(config.baseUrl + "/metrics/dashboard");
			setMetrics(data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3">
					<div className="card-counter primary">
						<i className="fa fa-users"></i>
						<div className="content">
							<span className="count-numbers">{metrics?.totalUsers}</span>
							<span className="count-name">Total Users</span>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<div className="card-counter danger">
						<i className="fa fa-calendar"></i>
						<div className="content">
							<span className="count-numbers">{metrics?.totalEvents}</span>
							<span className="count-name">Total Events</span>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<div className="card-counter success">
						<i className="fa fa-envelope"></i>
						<div className="content">
							<span className="count-numbers">{metrics?.totalNewsletters}</span>
							<span className="count-name">Total Newsletters</span>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<div className="card-counter info">
						<i className="fa fa-info"></i>
						<div className="content">
							<span className="count-numbers">{metrics?.totalInternships}</span>
							<span className="count-name">Total Internships</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
