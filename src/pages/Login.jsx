import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Login = () => {


	

	return (
		<div>
			<form className="flex w-50 flex-col gap-4 bg-slate-500 bg-opacity-80 p-3 mx-auto mt-16 rounded-3xl">
				<h1 className="text-center">Login</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="username" value="Username" />
					</div>
					<TextInput id="username" className="w-100" type="text" required />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Password" />
					</div>
					<TextInput id="password1" className="w-100" type="password" required />
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Remember me</Label>
				</div>
				<button className="btn btn-success  w-100" type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Login;
