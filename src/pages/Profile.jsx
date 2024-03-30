import React from "react";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
	return (
		<div className="flex flex-col justify-center items-center mx-auto bg-slate-300 w-50 mt-16 py-10 rounded-full bg-opacity-70">
			<div className="flex items-center gap-1"></div>
			<img src="/avatar.png" alt="" width={100} />
			<h1>Profile</h1>

			<div className="flex items-center gap-3">
				<h3>Username: </h3>
				<h4>Shahboz</h4>
			</div>

			<div className="flex items-center gap-3">
				<h3>Password: </h3>
				<h4>123465Shah</h4>
			</div>

			<div className="flex gap-3">
				<Link className="btn btn-sm btn-warning" to="/login">
					Log out
				</Link>
				<Link className="btn btn-sm btn-warning" to="/">
					Back to main page
				</Link>
			</div>
		</div>
	);
};

export default Profile;
