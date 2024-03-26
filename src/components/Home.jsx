import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";

import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import Add from "./Add";
import Read from "./Read/";
import Edit from "./Edit/";

const Home = () => {
	const [users, setUsers] = useState([]);
	const [deleteUser, setDeleteUser] = useState([]);
	const [show, setShow] = useState(false);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users");
			const data = await response.data;
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async (id) => {
		try {
			if (confirm("Are you sure you want to delete this user? ❌")) {
				const res = await axios.delete(`http://localhost:3000/users/${id}`);
				const data = await res.data;
				console.log("successfully deleted", data);
				setDeleteUser(deleteUser.filter((user) => user.id !== id));
				fetchUsers();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<React.Fragment>
			<header className="w-full bg-orange-200 fixed right-0 top-0 left-0  z-50 ">
				<Navbar
					className="container md:container md:mx-auto bg-bgcolorheader"
					fluid
					rounded>
					<NavbarBrand href="/">
						<img
							src="/react.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite React Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							Students App
						</span>
					</NavbarBrand>
					<div className="flex md:order-2">
						<div>
							<Add fetchUsers={fetchUsers} />
						</div>
						<NavbarToggle />
					</div>
					<NavbarCollapse>
						<NavbarLink href="#" active>
							Home
						</NavbarLink>
						<NavbarLink href="#">About</NavbarLink>
						<NavbarLink href="#">Services</NavbarLink>
						<NavbarLink href="#">Pricing</NavbarLink>
						<NavbarLink href="#">Contact</NavbarLink>
					</NavbarCollapse>
				</Navbar>
			</header>

			<main>
				<div className=" container md:container md:mx-auto overflow-x-auto mt-28">
					<Table hoverable>
						<Table.Head>
							<Table.HeadCell className="p-4">id</Table.HeadCell>
							<Table.HeadCell>Fullname</Table.HeadCell>
							<Table.HeadCell>Group</Table.HeadCell>
							<Table.HeadCell>Phone</Table.HeadCell>
							<Table.HeadCell>
								<span>Action</span>
							</Table.HeadCell>
						</Table.Head>

						<Table.Body className="divide-y">
							{users.map((user, index) => (
								<Table.Row
									key={user.id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell className="p-4">{index + 1}</Table.Cell>
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
										{user.name}
									</Table.Cell>
									<Table.Cell>{user.group}</Table.Cell>
									<Table.Cell>{user.phone}</Table.Cell>
									<Table.Cell className="flex gap-3">
										<Link
											to={`/read/${user.id}`}
											className="btn btn-sm btn-primary font-medium text-cyan-600 hover:underline dark:text-cyan-500">
											Read
										</Link>
										<Link
											to={`/edit/${user.id}`}
											className="btn btn-sm btn-warning font-medium text-cyan-600 hover:underline dark:text-cyan-500">
											Edit
										</Link>
										<Link
											onClick={() => handleDelete(user.id)}
											className="btn btn-sm btn-danger font-medium text-cyan-600 hover:underline dark:text-cyan-500">
											Delete
										</Link>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			</main>
		</React.Fragment>
	);
};

export default Home;
