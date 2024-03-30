import React from "react";
import "./Contacts.css";
import { Link } from "react-router-dom";

const Contacts = () => {
	return (
		<div
			className="flex flex-col mx-auto justify-center items-center pt-10"
			id="contacts">
			<div className="w-50 bg-slate-600 p-5 rounded-lg bg-opacity-80 text-zinc-100">
				<h1>CONTACTS</h1>
				<p>Tel: +1 936 4562 456</p>
				<p>Email: service@students.us</p>
				<p>Address: 17th Street Stone Vil, Louisville, KY</p>
                <Link className="btn btn-sm btn-warning" to='/'>Back to main page</Link>
			</div>
		</div>
	);
};

export default Contacts;
