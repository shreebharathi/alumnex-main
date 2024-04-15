import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import moment from "moment";
import { startCase, camelCase, pick } from "lodash";
import "./Internship.css";

const Internships = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [internshipsData, setInternshipsData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [internshipData, setInternshipData] = useState({
		title: "",
		description: "",
		companyName: "",
		companyDescription: "",
		postedBy: "",
		location: "",
		duration: "",
		stipend: 0,
		applicationDeadline: "",
		applyLink:"",
	});
	const [isEditing, setIsEditing] = useState(false);

	const internshipKeys = [
		"title",
		"description",
		"companyName",
		"companyDescription",
		"postedBy",
		"location",
		"duration",
		"stipend",
		"applicationDeadline",
		"applyLink",
	];

	useEffect(() => {
		fetchAllInternships();
	}, []);

	const fetchAllInternships = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(config.baseUrl + "/internship/all");
			setInternshipsData(data);
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};

	const handleDelete = async (id) => {
		try {
			const { status } = await axios.delete(
				config.baseUrl + `/internship/${id}`
			);
			if (status === 200) {
				toast.success("Internship Deleted", {
					position: "bottom-right",
				});
				fetchAllInternships();
			}
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
				accessor: "title",
				disableFilters: true,
			},
			{
				Header: "Description",
				Footer: "Description",
				accessor: "description",
				disableFilters: true,
			},
			{
				Header: "Company Name",
				Footer: "Company Name",
				accessor: "companyName",
				disableFilters: true,
			},
			{
				Header: "Company Description",
				Footer: "Company Description",
				accessor: "companyDescription",
				disableFilters: true,
			},
			{
				Header: "Location",
				Footer: "Location",
				accessor: "location",
				disableFilters: true,
			},
			{
				Header: "Duration",
				Footer: "Duration",
				accessor: "duration",
				disableFilters: true,
			},
			{
				Header: "Stipend",
				Footer: "Stipend",
				accessor: "stipend",
				disableFilters: true,
			},
			{
				Header: "Deadline",
				Footer: "Deadline",
				accessor: "applicationDeadline",
				disableFilters: true,
				Cell: ({ cell: { value } }) => <>{moment(value).format("LLL")}</>,
			},
			{

					Header: "Link",
					Footer: "Link",
					accessor: "applyLink",
					disableFilters: true,
					style:{maxWidth: "200px"},
					Cell: ({ row }) => (
					  <a href={row.original.applyLink} target="_blank" rel="noopener noreferrer">
						{row.original.applyLink}
					  </a>
					)
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
								setInternshipData(() => original);
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
		setInternshipData({ ...internshipData, [name]: value });
	};

	const validateForm = (internshipData) => {
		for (const key in internshipKeys) {
			if (
				internshipData.hasOwnProperty(key) &&
				!internshipData[key] &&
				key !== "stipend"
			) {
				console.log(`Please fill in the ${key}`);
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
		if (validateForm(pick(internshipData, internshipKeys))) {
			try {
				setIsLoading(true);
				await axios(
					isEditing
						? config.baseUrl + `/internship/${internshipData._id}`
						: config.baseUrl + "/internship",
					{
						data: pick(internshipData, internshipKeys),
						method: isEditing ? "PATCH" : "POST",
					}
				);
				fetchAllInternships();
				setIsLoading(false);
			} catch (error) {
				toast.error(error.message, {
					position: "bottom-right",
				});
			}
			setShowModal(false);
			setInternshipData({
				title: "",
				description: "",
				companyName: "",
				companyDescription: "",
				postedBy: "",
				location: "",
				duration: "",
				stipend: 0,
				applicationDeadline: "",
				applyLink:"",
			});
		}
	};

	return (
		<div className="intern-container">
			<h3>Internships</h3>

			<SimpleGrid
				globalSearch={true}
				tableFooter={false}
				tableData={internshipsData}
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
								<h5 className="modal-title">Create Internship</h5>
							</div>
							<div className="modal-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Title</label>
										<input
											type="text"
											className="form-control"
											name="title"
											value={internshipData.title}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Description</label>
										<textarea
											className="form-control"
											name="description"
											value={internshipData.description}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Company Name</label>
										<input
											type="text"
											className="form-control"
											name="companyName"
											value={internshipData.companyName}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Company Description</label>
										<textarea
											className="form-control"
											name="companyDescription"
											value={internshipData.companyDescription}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Posted By (User ID)</label>
										<input
											type="text"
											className="form-control"
											name="postedBy"
											value={internshipData.postedBy}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Location</label>
										<input
											type="text"
											className="form-control"
											name="location"
											value={internshipData.location}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Duration</label>
										<input
											type="text"
											className="form-control"
											name="duration"
											value={internshipData.duration}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Stipend</label>
										<input
											type="number"
											className="form-control"
											name="stipend"
											value={internshipData.stipend}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Application Deadline</label>
										<input
											type="datetime-local"
											className="form-control"
											name="applicationDeadline"
											value={internshipData.applicationDeadline}
											onChange={handleInputChange}
											required
										/>
										</div>
										<div className="form-group">
										<label>Application Link</label>
										<input
											type="url"
											className="form-control"
											name="applyLink"
											value={internshipData.applyLink}
											onChange={handleInputChange}
											required
										/>
									</div>

								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => {
										setShowModal(false);
										setInternshipData({
											eventTitle: "",
											eventDescription: "",
											eventVenue: "",
											eventTimestamp: "",
											organizer: "",
											attendees: "",
											isVirtual: false,
										});
									}}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSubmit}
								>
									Save Internship
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Internships;
