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
import { AuthProvider } from "./components/Auth";
import RequiredAuth from "./components/RequiredAuth";

const App = () => {
	return (
		<React.Fragment>
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<RequiredAuth>
									<Home />
								</RequiredAuth>
							}
						/>
						<Route path="/add" element={<Add />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/read/:id" element={<Read />} />
						<Route
							path="/contacts"
							element={
								<RequiredAuth>
									<Contacts />
								</RequiredAuth>
							}
						/>
						<Route
							path="/about"
							element={
								<RequiredAuth>
									<About />
								</RequiredAuth>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route
							path="/profile"
							element={
								<RequiredAuth>
									<Profile />
								</RequiredAuth>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AuthProvider>
			</Router>
		</React.Fragment>
	);
};

export default App;
