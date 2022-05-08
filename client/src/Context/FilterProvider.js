import React, { createContext, useContext } from "react";
import { HomeContext } from "./HomeProvider";

export const filterContext = createContext();

const FilterProvider = ({ children }) => {
	// ! context
	const { products, setProducts, productsClone } = useContext(HomeContext);

	// setActive
	const setActive = event => {
		const target = event.target;
		const parent = target.parentElement;
		Object.values(parent.children).forEach(div => div.classList.remove("active"));
		target.classList.add("active");
	};

	//handleFilterBySize
	const handleFilterBySize = event => {
		setActive(event);

		const size = event.target.textContent;
		if (size === "All") {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(p => p.sizes.includes(size));
			setProducts(newProducts);
		}
	};

	// handle filter by color
	const handleFilterByColor = event => {
		setActive(event);

		const color = event.target.style.backgroundColor;
		if (event.target.textContent === "All") {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(ele => ele.colors.includes(color));
			setProducts(newProducts);
		}
	};

	// handle filter by categories
	const handleFilterByCategory = e => {
		setActive(e);

		let target = e.target.innerHTML.toLowerCase();
		if (target === "all") {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(p => p.category === target);
			setProducts(newProducts);
		}
	};
	//handle Filter By Sort
	const handleFilterBySort = event => {
		setActive(event);

		let order = event.target.textContent;
		if (order === "All") {
			setProducts(productsClone);
		} else {
			let newProducts = [...products].sort((current, next) => {
				if (order === "Lowest") {
					return current.price - next.price;
				} else if (order === "Highest") {
					return next.price - current.price;
				} else if (order === "Latest") {
					return current._id > next._id ? -1 : 1;
				} else return null;
			});

			setProducts(newProducts);
		}
	};

	return (
		<filterContext.Provider
			value={{
				handleFilterBySize,
				handleFilterByColor,
				handleFilterByCategory,
				handleFilterBySort,
				setActive,
			}}
		>
			{children}
		</filterContext.Provider>
	);
};

export default FilterProvider;
