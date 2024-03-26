import { Label, Select } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Edit = () => {
	const [show, setShow] = useState(false);
  const [users, setUsers] = useState([{
		name: "",
		group: "",
		phone: "",
	}]);
	// const [editUser, setEditUser] = useState({
	// 	name: "",
	// 	group: "",
	// 	phone: "",
	// });

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	const fetchUsers = async (id) => {
		try {
			const response = await axios.get(`http://localhost:3000/users/${id}`);
			const data = await response.data;
			setUsers(data);
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
			const response = await axios.put(`http://localhost:3000/users/${id}`, editUser);
      handleShow()
			console.log("User added", response.data);
			fetchUsers();
		} catch (error) {
			console.log(error.message);
		} finally {
			handleClose();
		}
	};

	return (
		<div>
			<button onClick={handleShow}>
				Edit
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="fullname">
							<Form.Label>Fullname</Form.Label>
							<Form.Control
								// onChange={(e) =>
								// 	setEditUser({ ...editUser, name: e.target.value })
								// }
								value={users.name}
								type="name"
								placeholder="John Smith"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="group">
							<Form.Label>Group</Form.Label>
							<Select
								// onChange={(e) =>
								// 	setAddUseer({ ...editUser, group: e.target.value })
								// }
								value={users.group}
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
								// onChange={(e) =>
								// 	setAddUseer({ ...editUser, phone: e.target.value })
								// }
								value={users.phone}
								required
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Edit;
