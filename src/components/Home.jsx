import React, { createContext, useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	Label,
	Select,
	Table,
	TableCell,
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
import { Link, NavLink } from "react-router-dom";
import Add from "./Add";
import Read from "./Read/";
import Edit from "./Edit/";
import "./Home.css";

const Home = () => {
	const [users, setUsers] = useState([]);
	const [deleteUser, setDeleteUser] = useState([]);
	const [search, setSearch] = useState("");
	const [filteredUser, setFilteredUser] = useState(users);
	const [selectedFilter, setSelectedFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	//////////// DATA FETCHING //////////////

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users");
			const data = await response.data;
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	/////////////// PAGINATION //////////////

	const itemsPerPage = 3;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
	// const filteredUsers = currentItems

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	//////////////// FILTER //////////////////

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

	///////////////// DELETE /////////////////

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
			<header className="w-full bg-orange-300 fixed right-0 top-0 left-0  z-50 bg-opacity-80">
				<Navbar
					className="container md:container md:mx-auto bg-bgcolorheader"
					fluid
					rounded>
					<NavbarBrand href="/">
						<img
							src="/student.png"
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite React Logo"
						/>
						<div className="flex flex-col">
							<span className="self-center whitespace-nowrap text-xl font-bold dark:text-white text-gray-800">
								Students App
							</span>
							<span
								style={{ fontSize: 12 }}
								className="dark:text-white text-gray-800">
								Shahboz Nabiyev Production
							</span>
						</div>
					</NavbarBrand>
					<div className="flex md:order-2">
						<NavbarToggle />
					</div>
					<NavbarCollapse className="flex items-center justify-center">
						<div>
							<TextInput
								id="search"
								className="w-400"
								type="search"
								placeholder="👉 Search by name..."
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<Link to="/">Home</Link>
							<Link to="/about">About</Link>
							<Link to="/contacts">Contacts</Link>
						</div>

						<div className="flex items-center">
							<NavLink to="/profile" className="flex items-center gap-2">
								<img src="/avatar.png" alt="" width={60} height={60} />
								<span>Shahboz</span>
							</NavLink>
						</div>
					</NavbarCollapse>
				</Navbar>
			</header>

			<main>
				<div className=" container md:container md:mx-auto overflow-x-auto mt-28">
					<Table className="bg-opacity-50">
						<Table.Head className="bg-opacity-50">
							<Table.HeadCell className="p-4 bg-opacity-50">id</Table.HeadCell>
							<Table.HeadCell className="bg-opacity-50">
								Fullname
							</Table.HeadCell>
							<Table.HeadCell className="bg-opacity-50">Group</Table.HeadCell>
							<Table.HeadCell className="bg-opacity-50">Phone</Table.HeadCell>
							<Table.HeadCell className="flex items-center justify-between bg-opacity-50">
								<span>Action</span>
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
								<div className="">
									<Add fetchUsers={fetchUsers} />
								</div>
							</Table.HeadCell>
						</Table.Head>

						<Table.Body className="divide-y bg-opacity-50">
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
												className="bg-slate-100 bg-opacity-80">
												<Table.Cell className="p-4">{index + 1}</Table.Cell>
												<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white bg-opacity-50">
													{user.name}
												</Table.Cell>
												<Table.Cell>{user.group}</Table.Cell>
												<Table.Cell>{user.phone}</Table.Cell>
												<Table.Cell className="flex gap-3">
													<Link
														to={`/read/${user.id}`}
														className="btn btn-sm btn-primary font-medium text-cyan-600 hover:underline dark:text-cyan-500">
														Read 👁️
													</Link>
													<Link
														to={`/edit/${user.id}`}
														className="btn btn-sm btn-warning font-medium text-cyan-600 hover:underline dark:text-cyan-500">
														Edit 📝
													</Link>
													<Link
														onClick={() => handleDelete(user.id)}
														className="btn btn-sm btn-danger font-medium text-cyan-600 hover:underline dark:text-cyan-500">
														Delete ⨉
													</Link>
												</Table.Cell>
											</Table.Row>
										))
								: currentItems
										.filter((user) => {
											return search.toLocaleLowerCase() === ""
												? user
												: user.name.toLocaleLowerCase().includes(search);
										})
										.map((user, index) => (
											<Table.Row
												key={user.id}
												className="bg-slate-100 bg-opacity-80">
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
														Read 👁️
													</Link>
													<Link
														to={`/edit/${user.id}`}
														className="btn btn-sm btn-warning font-medium text-cyan-600 hover:underline dark:text-cyan-500">
														Edit 📝
													</Link>
													<Link
														onClick={() => handleDelete(user.id)}
														className="btn btn-sm btn-danger font-medium text-cyan-600 hover:underline dark:text-cyan-500">
														Delete ⨉
													</Link>
												</Table.Cell>
											</Table.Row>
										))}
						</Table.Body>
					</Table>
					<div className="flex align-middle justify-center mx-auto gap-3 mt-3 bg-orange-300 p-1">
						<button
							className="btn btn-sm btn-light"
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}>
							⏮️ Prev Page
						</button>
						<button
							className="btn btn-sm btn-light"
							onClick={() => paginate(currentPage + 1)}
							disabled={indexOfLastItem >= users.length}>
							Next Page ⏭️
						</button>
					</div>
				</div>
			</main>
		</React.Fragment>
	);
};

export default Home;
