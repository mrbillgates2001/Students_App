import { Label, Select } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
	const [show, setShow] = useState(false);
	// const [users, setUsers] = useState("");
	const [editUser, setEditUser] = useState({
		name: "",
		group: "",
		phone: "",
	});
	const { id } = useParams();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  const navigate = useNavigate();

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/users/` + id);
			const data = await response.data;
			setEditUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`http://localhost:3000/users/` + id,
				editUser
			);
			setEditUser(response.data);
			handleShow();
			console.log("User updated", response.data);
			fetchUsers();
		} catch (error) {
			console.log(error.message);
		} finally {
			navigate('/')
		}
	};

	return (
		<div className="w-50 h-75 rounded-lg bg-slate-200 mx-auto mt-3 p-5 bg-opacity-80">
      <h3 className="text-center mb-3">Update user info</h3>
			<Form onSubmit={handleSubmit}> 
				<Form.Group className="mb-3" controlId="fullname">
					<Form.Label>Fullname</Form.Label>
					<Form.Control
						onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
						value={editUser.name}
						type="name"
						placeholder="John Smith"
						autoFocus
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="group">
					<Form.Label>Group</Form.Label>
					<Select
						onChange={(e) =>
							setEditUser({ ...editUser, group: e.target.value })
						}
						value={editUser.group}
						required>
						<option>Choose your group</option>
						<option>Group 1</option>
						<option>Group 2</option>
						<option>Group 3</option>
						<option>Group 4</option>
					</Select>
				</Form.Group>
				<Form.Group className="mb-3" controlId="phone">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						type="phone"
						placeholder="+998(90)-123-45-67"
						onChange={(e) =>
							setEditUser({ ...editUser, phone: e.target.value })
						}
						value={editUser.phone}
						required
						autoFocus
					/>
				</Form.Group>
			</Form>
			<div className="flex gap-3">
				<Link to='/' className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Close
				</Link>
				<Button variant="primary" onClick={handleSubmit}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default Edit;
