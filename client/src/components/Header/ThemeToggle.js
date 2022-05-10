import React, { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";

export const lightTheme = {
	"--mainColor": "#41b1d3",
	"--hover-bg": "#ebedec",
	"--second-color": "#d23f57",
	"--main-light-bg": "#b8d8e088",
	"--second-light-bg": "rgb(252, 233, 236)",
	"--boxShadow": "0px 1px 5px rgb(3 0 71 / 9%)",
	"--boxShadowStrong": "0px 5px 5px rgb(3 0 71/ 15%)",
	"--main-text-color": "#f3f3f3",
	"--second-text-color": "#373F50",
	"--body-color": "#F6F9F9",
	"--boxes-bg": "#fff",
	"--main-border": "1px solid #ddd",
	"--main-padding": "10px",
	"--text-color-light": "#7D879C",
	"--model-overlay-bg": "rgba(61, 61, 61, 0.7)",
	"--boxes-border": "1px solid transparent",
};

export const darkTheme = {
	"--mainColor": "#161b22",
	"--hover-bg": "#48494d",
	"--second-color": "#0f5b62",
	"--main-light-bg": "#1f272e",
	"--second-light-bg": "rgb(104, 104, 104)",
	"--boxShadow": "0 1px 6px 0 #171717",
	"--boxShadowStrong": "0 1px 6px 0 #171717",
	"--main-text-color": "#fff",
	"--second-text-color": "#fff9",
	"--body-color": "#0d1117",
	"--boxes-bg": "#161b22",
	"--main-border": "1px solid #30363d",
	"--main-padding": "10px",
	"--text-color-light": "#939394",
	"--model-overlay-bg": "rgb(219 219 219 / 19%)",
	"--boxes-border": "1px solid #30363d",
};

const ThemeToggle = () => {
	// states
	const [theme, setTheme] = useState(localStorage.theme || "light");

	// Toggle Theme
	const ToggleTheme = _ => {
		setTheme(theme === "light" ? "dark" : "light");
		localStorage.setItem("theme", theme);
	};

	useEffect(() => {
		const root = document.querySelector(":root");
		if (theme === "dark") {
			Object.keys(darkTheme).forEach(value => {
				root.style.setProperty(value, darkTheme[value]);
			});
			root.style.setProperty("color", "#fff");
		} else {
			Object.keys(lightTheme).forEach(value => {
				root.style.setProperty(value, lightTheme[value]);
			});
			root.style.setProperty("color", "inherit");
		}
	}, [theme]);

	// Save Theme In Local Storage
	useEffect(_ => localStorage.setItem("theme", theme), [theme]);

	return (
		<div onClick={ToggleTheme} className="theme-toggle">
			<span className={`circle ${theme === "dark" && "move-right"}`}></span>

			<IoMdMoon className="moon" />
			<BsFillSunFill className="sun" />
		</div>
	);
};

export default ThemeToggle;
