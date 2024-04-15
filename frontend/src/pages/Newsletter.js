import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import moment from "moment";
import { startCase, camelCase, pick } from "lodash";
import "./Newsletter.css";

const Newsletter = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [newsletterData, setNewsletterData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [newsletterFormData, setNewsletterFormData] = useState({
		title: "",
		description: "",
		postedBy: "",
		category: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	const newsletterKeys = ["title", "description", "postedBy", "category"];

	useEffect(() => {
		fetchAllNewsletters();
	}, []);

	const fetchAllNewsletters = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(config.baseUrl + "/newsletter/all");
			setNewsletterData(data);
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
				Header: "Category",
				Footer: "Category",
				accessor: "category",
				disableFilters: true,
			},
			{
				Header: "Created At",
				Footer: "Created At",
				accessor: "createdAt",
				disableFilters: true,
				Cell: ({ cell: { value } }) => <>{moment(value).format("LLL")}</>,
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
								setNewsletterFormData(() => original);
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

	const handleDelete = async (id) => {
		try {
			const { status } = await axios.delete(
				config.baseUrl + `/newsletter/${id}`
			);
			if (status === 200) {
				toast.success("Newsletter Deleted", {
					position: "bottom-right",
				});
				fetchAllNewsletters();
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
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
		setNewsletterFormData({ ...newsletterFormData, [name]: value });
	};

	const validateForm = (newsletterData) => {
		for (const key in newsletterKeys) {
			if (newsletterData.hasOwnProperty(key) && !newsletterData[key]) {
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
		if (validateForm(pick(newsletterFormData, newsletterKeys))) {
			try {
				setIsLoading(true);
				await axios(
					isEditing
						? config.baseUrl + `/newsletter/${newsletterFormData._id}`
						: config.baseUrl + "/newsletter",
					{
						data: pick(newsletterFormData, newsletterKeys),
						method: isEditing ? "PATCH" : "POST",
					}
				);
				fetchAllNewsletters();

				setIsLoading(false);
			} catch (error) {
				toast.error(error.message, {
					position: "bottom-right",
				});
			}
			setShowModal(false);
			setNewsletterFormData({
				title: "",
				description: "",
				postedBy: "",
				category: "",
			});
		}
	};

	return (
		<div className="news-container">
			<h3>Newsletter</h3>

			<SimpleGrid
				globalSearch={true}
				tableFooter={false}
				tableData={newsletterData}
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
								<h5 className="modal-title">Create Newsletter</h5>
							</div>
							<div className="modal-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Title</label>
										<input
											type="text"
											className="form-control"
											name="title"
											value={newsletterFormData.title}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Description</label>
										<textarea
											type="text"
											className="form-control"
											name="description"
											value={newsletterFormData.description}
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
											value={newsletterFormData.postedBy}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Category</label>
										<input
											type="text"
											className="form-control"
											name="category"
											value={newsletterFormData.category}
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
										setNewsletterFormData({
											title: "",
											description: "",
											postedBy: "",
											category: "",
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
									Save Newsletter
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Newsletter;
