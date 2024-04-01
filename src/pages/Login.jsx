import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate()

	const [data, setData] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(data)
		if (data.username.length >= 3 && data.password.length >= 3) {
			login(data);
			navigate('/')
		}
		return;
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex w-72 items-center justify-center flex-col gap-4 bg-slate-500 bg-opacity-80 py-3 mx-auto mt-16 rounded-3xl">
				<h1 className="text-center">Login</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="username" value="Username" />
					</div>
					<TextInput
						id="username"
						className="w-60"
						type="text"
						required
						value={data.username}
						onChange={(e) => setData({ ...data, username: e.target.value })}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Password" />
					</div>
					<TextInput
						id="password1"
						className="w-60"
						type="password"
						required
						value={data.password}
						onChange={(e) => setData({ ...data, password: e.target.value })}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Remember me</Label>
				</div>
				<button className="btn btn-warning  w-60" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
