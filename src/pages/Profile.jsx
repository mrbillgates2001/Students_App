import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";

const Profile = () => {
	const { userjon, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="flex flex-col justify-center items-center mx-auto bg-slate-300 w-50 mt-16 py-10 rounded-full bg-opacity-70">
			<div className="flex flex-col items-center gap-1">
				<img src="/avatar.png" alt="" width={100} />
				<h1>Profile</h1>
			</div>

			<div className="flex items-center gap-3">
				<h3>Username: </h3>
				<h4>{userjon && userjon.username}</h4>
			</div>

			<div className="flex items-center gap-3">
				<h3>Password: </h3>
				<h4>{userjon && userjon.password}</h4>
			</div>

			<div className="flex gap-3">
				<button className="btn btn-sm btn-warning" onClick={handleLogout}>
					Log out
				</button>
				<Link className="btn btn-sm btn-warning" to="/">
					Back to main page
				</Link>
			</div>
		</div>
	);
};

export default Profile;
