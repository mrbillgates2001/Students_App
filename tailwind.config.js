/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {},
	},
	colors: {
		bgcolorheader: "#ffe8a3",
		bgcolormain: "#00000",
	},
	plugins: [require("flowbite/plugin")],
};
