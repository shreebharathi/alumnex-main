import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import moment from "moment";
import { startCase, camelCase } from "lodash";

const Events = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [eventsData, setEventsData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [eventData, setEventData] = useState({
		eventTitle: "",
		eventDescription: "",
		eventVenue: "",
		eventTimestamp: "",
		organizer: "",
		attendees: "",
		isVirtual: false,
	});

	useEffect(() => {
		fetchAllEvents();
	}, []);

	const fetchAllEvents = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(config.baseUrl + "/event/all");
			setEventsData(data);
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};

	const getColumns = () => {
		const columns = [
			{
				Header: "Title",
				Footer: "Title",
				accessor: "eventTitle",
				disableFilters: true,
			},
			{
				Header: "Description",
				Footer: "Description",
				accessor: "eventDescription",
				disableFilters: true,
			},
			{
				Header: "Venue",
				Footer: "Venue",
				accessor: "eventVenue",
				disableFilters: true,
			},
			{
				Header: "Organizer",
				Footer: "Organizer",
				accessor: "organizer",
				disableFilters: true,
			},
			{
				Header: "Deadline",
				Footer: "Deadline",
				accessor: "registrationDeadline",
				disableFilters: true,
				Cell: ({ cell: { value } }) => <>{moment(value).format("LLL")}</>,
			},
			{
				Header: "isVirtual",
				Footer: "isVirtual",
				accessor: "isVirtual",
				disableFilters: true,
				Cell: ({ cell: { value } }) => <>{value ? "Yes" : "No"}</>,
			},
		];

		return columns;
	};

	const getToolbarItems = () => {
		return (
			<div>
				<button className="btn btn-primary" onClick={() => setShowModal(true)}>
					Add New
				</button>
			</div>
		);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const updatedValue = name === "isVirtual" ? e.target.checked : value;
		setEventData({ ...eventData, [name]: updatedValue });
	};

	const validateForm = () => {
		// Check if any of the fields are empty (excluding isVirtual as it's a boolean)
		for (const key in eventData) {
			if (key !== "isVirtual" && !eventData[key]) {
				toast.error(`Please fill in the ${startCase(camelCase(key))}`, {
					position: "bottom-right",
				});

				return false;
			}
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				setIsLoading(true);
				await axios.post(config.baseUrl + "/event", eventData);
				fetchAllEvents();
				setIsLoading(false)
				setEventData({
					eventTitle: "",
					eventDescription: "",
					eventVenue: "",
					eventTimestamp: "",
					organizer: "",
					attendees: "",
					isVirtual: false,
				})
			} catch (error) {
				toast.error(error.response.data.message, {
					position: "bottom-right",
				});
			}

			setShowModal(false);
		}
	};

	return (
		<div>
			<h3>Events</h3>

			<SimpleGrid
				globalSearch={true}
				tableFooter={false}
				tableData={eventsData}
				tableColumns={getColumns()}
				isLoading={isLoading}
				toolBarItems={getToolbarItems()}
			/>

			{showModal && (
				<div className="modal show d-block" tabIndex="-1" role="dialog">
					<div
						className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Create Event</h5>
							</div>
							<div className="modal-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Event Title</label>
										<input
											type="text"
											className="form-control"
											name="eventTitle"
											value={eventData.eventTitle}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group">
										<label>Event Description</label>
										<textarea
											className="form-control"
											name="eventDescription"
											value={eventData.eventDescription}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group">
										<label>Event Venue</label>
										<input
											type="text"
											className="form-control"
											name="eventVenue"
											value={eventData.eventVenue}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group">
										<label>Event Timestamp</label>
										<input
											type="datetime-local"
											className="form-control"
											name="eventTimestamp"
											value={eventData.eventTimestamp}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group">
										<label>Organizer</label>
										<input
											type="text"
											className="form-control"
											name="organizer"
											value={eventData.organizer}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group">
										<label>Attendees</label>
										<input
											type="number"
											className="form-control"
											name="attendees"
											value={eventData.attendees}
											onChange={handleInputChange}
										/>
									</div>
									<div className="form-group form-check">
										<input
											type="checkbox"
											className="form-check-input"
											name="isVirtual"
											checked={eventData.isVirtual}
											onChange={handleInputChange}
										/>
										<label className="form-check-label">Is Virtual</label>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSubmit}
								>
									Save Event
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
