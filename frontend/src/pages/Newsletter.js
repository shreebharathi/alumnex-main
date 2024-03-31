import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import moment from "moment";
import { startCase, camelCase } from "lodash";

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
		setNewsletterFormData({ ...newsletterFormData, [name]: value });
	};

	const validateForm = () => {
		for (const key in newsletterFormData) {
			if (newsletterFormData.hasOwnProperty(key) && !newsletterFormData[key]) {
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
				await axios.post(config.baseUrl + "/newsletter", newsletterFormData);
				fetchAllNewsletters();
				setNewsletterFormData({
					title: "",
					description: "",
					postedBy: "",
					category: "",
				});
				setIsLoading(false);
			} catch (error) {
				toast.error(error.message, {
					position: "bottom-right",
				});
			}
			setShowModal(false);
		}
	};

	return (
		<div>
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
									onClick={() => setShowModal(false)}
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
