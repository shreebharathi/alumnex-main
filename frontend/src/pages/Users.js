import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";
import { camelCase, pick, startCase } from "lodash";

const Users = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState({
		role: "",
		name: "",
		email: "",
		phone: "",
	});
	console.log(editData)
	const userKeys = ["email", "name", "phone", "role"];

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const fetchAllUsers = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(config.baseUrl + "/user/all");
			setUserData(data);
		} catch (error) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			});
		}
	};

	const getColumns = () => {
		const columns = [
			{
				Header: "User Id",
				Footer: "User Id",
				accessor: "_id",
				disableFilters: true,
			},
			{
				Header: "Name",
				Footer: "Name",
				accessor: "name",
				disableFilters: true,
			},
			{
				Header: "Role",
				Footer: "Role",
				accessor: "role",
				disableFilters: true,
			},
			{
				Header: "Email",
				Footer: "Email",
				accessor: "email",
				disableFilters: true,
			},
			{
				Header: "Phone",
				Footer: "Phone",
				accessor: "phone",
				disableFilters: true,
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
								setEditData(()=> original)
								setShowModal(true);
								
							}}
						>
							<i class="fa fa-pencil-square-o"></i>
						</button>
					</div>
				),
			},
		];

		return columns;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
	};

	const validateForm = (userKeys) => {
		for (const key in userKeys) {
			if (editData.hasOwnProperty(key) && !editData[key]) {
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
		if (validateForm(pick(editData, userKeys))) {
			try {
				setIsLoading(true);
				await axios(config.baseUrl +`/user/${editData._id}`, {
					data: pick(editData, userKeys),
					method: "PATCH",
				});
				fetchAllUsers();

				setIsLoading(false);
			} catch (error) {
				toast.error(error.message, {
					position: "bottom-right",
				});
			}
			setShowModal(false);
			setEditData({
				role: "",
				name: "",
				email: "",
				phone: "",
			});
		}
	};

	return (
		<div>
			<h3>Users</h3>
			<SimpleGrid
				globalSearch={true}
				tableFooter={false}
				tableData={userData}
				tableColumns={getColumns()}
				isLoading={isLoading}
			/>

			{showModal && (
				<div className="modal show d-block" tabIndex="-1" role="dialog">
					<div
						className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Update User</h5>
							</div>
							<div className="modal-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Name</label>
										<input
											type="text"
											className="form-control"
											name="name"
											value={editData.name}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<textarea
											type="email"
											className="form-control"
											name="email"
											value={editData.email}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input
											type="text"
											className="form-control"
											name="phone"
											value={editData.phone}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="form-group">
										<label>Role</label>
										<select
											className="form-control"
											value={editData.role}
											onChange={handleInputChange}
											name="role"
										>
											<option value="Alumni">Alumni</option>
											<option value="Student">Student</option>
											<option value="Staff">Faculty</option>
											<option value="Admin">Admin</option>
										</select>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => {
										setShowModal(false);
										setEditData({
											role: "",
											name: "",
											email: "",
											phone: "",
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
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Users;
