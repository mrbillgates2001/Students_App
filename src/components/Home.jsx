import React, { createContext, useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	Label,
	Select,
	Table,
	TextInput,
} from "flowbite-react";
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
	const [search, setSearch] = useState("");
	const [filteredUser, setFilteredUser] = useState(users);
	const [selectedFilter, setSelectedFilter] = useState("");

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users");
			const data = await response.data;
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};


	const handleFilterChange = (e) => {
		const filterValue = e.target.value;
		setSelectedFilter(filterValue);

		if (filterValue === "All Groups") {
			setFilteredUser(users);
		} else {
			const filtered = users.filter((user) => user.group === filterValue);
			setFilteredUser(filtered);
		}
	};

	useEffect(() => {
		fetchUsers();
		setUsers(filteredUser);
	}, [filteredUser, setUsers]);

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

	// const searchUsers = async () => {
	// 	try {
	//         const response = await axios.get(
	//             `http://localhost:3000/users?search=${search}`
	//         );
	//         const data = await response.data;
	//         setUsers(data);
	//     } catch (error) {
	//         console.log(error);
	//     }
	// }

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
						<div className="flex align-middle gap-2">
							<TextInput
								id="search"
								className="w-400"
								type="search"
								placeholder="Search by name..."
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>

						<div className="max-w-md">
							<Select
								value={selectedFilter}
								onChange={handleFilterChange}
								id="Filter"
								required>
								<option>All Groups</option>
								<option>Group 1</option>
								<option>Group 2</option>
								<option>Group 3</option>
								<option>Group 4</option>
							</Select>
						</div>
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
							{filteredUser.length > 0
								? filteredUser
										.filter((user) => {
											return search.toLocaleLowerCase() === ""
												? user
												: user.name.toLocaleLowerCase().includes(search);
										})
										.map((user, index) => (
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
										))
								: users
										.filter((user) => {
											return search.toLocaleLowerCase() === ""
												? user
												: user.name.toLocaleLowerCase().includes(search);
										})
										.map((user, index) => (
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
