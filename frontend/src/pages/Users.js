import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleGrid from "../components/grid/SimpleGrid";
import config from "../config";
import { toast } from "react-toastify";

const Users = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState([]);
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
		];

		return columns;
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
		</div>
	);
};

export default Users;
