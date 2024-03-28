import { Label, Select } from "flowbite-react";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Add = ({ fetchUsers }) => {
	const [show, setShow] = useState(false);
	const [addUser, setAddUseer] = useState({
		name: "",
		group: "",
		phone: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddSubmit = async (e) => {
		e.preventDefault();
		try {
			if (addUser.name !== "" && addUser.phone !== "" && addUser.group !== "") {
				const response = await axios.post(
					"http://localhost:3000/users",
					addUser
				);
				console.log("User added", response.data);
				setAddUseer( {
					name: "",
                    group: "",
                    phone: "",
				})
				fetchUsers();
			} else {
				alert ("Please fill in all fields");
			}
		} catch (error) {
			console.log(error.message);
		} finally {
				handleClose();
		}
	};

	return (
		<div>
			<button className="btn btn-success" onClick={handleShow}>
				Add User ✨
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddSubmit}>
						<Form.Group className="mb-3" controlId="fullname">
							<Form.Label>Fullname</Form.Label>
							<Form.Control
							id="input"
								onChange={(e) =>
									setAddUseer({ ...addUser, name: e.target.value })
								}
								value={addUser.name}
								type="name"
								placeholder="John Smith"
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="group">
							<Form.Label>Group</Form.Label>
							<Select
								onChange={(e) =>
									setAddUseer({ ...addUser, group: e.target.value })
								}
								value={addUser.group}
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
									setAddUseer({ ...addUser, phone: e.target.value })
								}
								value={addUser.phone}
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
					<Button variant="primary" onClick={handleAddSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Add;
