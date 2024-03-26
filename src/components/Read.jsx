import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Read = () => {
	const [openModal, setOpenModal] = useState(false);
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
				<h1>Details of user</h1>
				<p>ID: {users.id}</p>
				<p>Fullname: {users.name}</p>
				<p>Group: {users.group}</p>
				<p>Phone: {users.phone}</p>
			</div>
			{/* <Button onClick={() => setOpenModal(true)}>Read</Button> */}
			{/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Detail of User</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer className="flex justify-end">
					<Button onClick={() => setOpenModal(false)}>Close</Button>
				</Modal.Footer>
			</Modal> */}
		</div>
	);
};

export default Read;
