import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import moment from "moment";
import { startCase, camelCase, pick } from "lodash";
import "./Events.css";

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
	const [isEditing, setIsEditing] = useState(false);

	const eventKeys = [
		"eventTitle",
		"eventDescription",
		"eventVenue",
		"eventTimestamp",
		"organizer",
		"attendees",
	];

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
			{
				Header: "Action",
				Footer: "Action",
				disableFilters: true,
				style: { maxWidth: "100px" },
				Cell: ({ row: { original } }) => (
					<div className="d-flex flex-row justify-content-around">
						<button
							className="btn btn-primary btn-sm"
							onClick={() => {
								setEventData(() => original);
								setIsEditing(true);
								setShowModal(true);
							}}
						>
							<i class="fa fa-pencil-square-o"></i>
						</button>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => {
								handleDelete(original._id);
							}}
						>
							<i class="fa fa-trash-o"></i>
						</button>
					</div>
				),
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

	const validateForm = (eventData) => {
		// Check if any of the fields are empty (excluding isVirtual as it's a boolean)

		for (const key of eventKeys) {
			if (!eventData[key]) {
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
		if (validateForm(pick(eventData, eventKeys))) {
			try {
				setIsLoading(true);
				await axios(
					isEditing
						? config.baseUrl + `/event/${eventData._id}`
						: config.baseUrl + "/event",
					{
						data: pick(eventData, eventKeys),
						method: isEditing ? "PATCH" : "POST",
					}
				);
				fetchAllEvents();
				setIsLoading(false);
			} catch (error) {
				toast.error(error.response.data.message, {
					position: "bottom-right",
				});
			}

			setShowModal(false);
			setIsEditing(false);
			setEventData({
				eventTitle: "",
				eventDescription: "",
				eventVenue: "",
				eventTimestamp: "",
				organizer: "",
				attendees: "",
				isVirtual: false,
			});
		}
	};

	const handleDelete = async (id) => {
		try {
			const { status } = await axios.delete(config.baseUrl + `/event/${id}`);
			if (status === 200) {
				toast.success("Event Deleted", {
					position: "bottom-right",
				});
				fetchAllEvents();
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};
	return (
		<div className="events-container">
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
			<div className="modal-wrapper">
			  <div className="modal">
				<div className="modal-header">
				  <h5 className="modal-title">Create Event</h5>
				  <button
					className="close-button"
					onClick={() => setShowModal(false)}
				  >
					&times;
				  </button>
				</div>
				<div className="modal-body">
				  <form onSubmit={handleSubmit}>
					{/* Your form inputs here */}
				  </form>
				</div>
				<div className="modal-footer">
				  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
					Close
				  </button>
				  <button className="btn btn-primary" onClick={handleSubmit}>
					Save Event
				  </button>
				</div>
			  </div>
			</div>
		  )}
		</div>
	  );
	};
	
	export default Events;
	
