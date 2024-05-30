/* Dashboard.js */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Ensure you style the cards and text appropriately

// Importing stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [newsletterCount, setNewsletterCount] = useState(0);
    const [internshipCount, setInternshipCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersResponse = await axios.get("/api/users/count");
            setUserCount(usersResponse.data.count);

            const eventsResponse = await axios.get("/api/events/count");
            setEventCount(eventsResponse.data.count);

            const newslettersResponse = await axios.get("/api/newsletters/count");
            setNewsletterCount(newslettersResponse.data.count);

            const internshipResponse = await axios.get("/api/internship/count");
            setInternshipCount(internshipResponse.data.count);

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
                            <span className="count-numbers">{userCount}</span>
                            <span className="count-name">Total Users</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter danger">
                        <i className="fa fa-calendar"></i>
                        <div className="content">
                            <span className="count-numbers">{eventCount}</span>
                            <span className="count-name">Total Events</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter success">
                        <i className="fa fa-envelope"></i>
                        <div className="content">
                            <span className="count-numbers">{newsletterCount}</span>
                            <span className="count-name">Total Newsletters</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-info"></i>
                        <div className="content">
                            <span className="count-numbers">{internshipCount}</span>
                            <span className="count-name">Total Internships</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;