import React, { createContext } from "react";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Home from "./Home";

const Read = () => {
	const [users, setUsers] = useState([]);
	const { id } = useParams();

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/users/` + id);
			const data = await response.data;
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="flex align-middle justify-center mt-20">
			<div className="w-50 h-50 bg-red-300 rounded-lg flex align-middle justify-center flex-col  p-10">
				<h1 className="text-center">Details of user</h1>
				<p>ID: {users.id}</p>
				<p>Fullname: {users.name}</p>
				<p>Group: {users.group}</p>
				<p>Phone: {users.phone}</p>
				<div className="flex gap-2 mx-auto">
					<Link to='/' className="btn btn-secondary">Back</Link>
					<Link to={`/edit/${users.id}`} className="btn btn-primary">Edit</Link>
				</div>
			</div>
		</div>
	);
};

export default Read;
