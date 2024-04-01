import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [userjon, setUser] = useState("Shohboz");

	const login = (user) => {
		setUser(user);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ userjon, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (userjon) => useContext(AuthContext);
