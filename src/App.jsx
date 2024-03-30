import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Read from "./components/Read";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";


const App = () => {
	return (
		<React.Fragment>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/add" element={<Add />} />
					<Route path="/edit/:id" element={<Edit />} />
					<Route path="/read/:id" element={<Read />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
};

export default App;
