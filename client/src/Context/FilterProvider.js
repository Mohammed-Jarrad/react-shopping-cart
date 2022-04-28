import React, {createContext, useContext} from 'react';
import {HomeContext} from './HomeProvider';

export const filterContext = createContext();

const FilterProvider = ({children}) => {
	// ! context
	const {products, setProducts, productsClone} = useContext(HomeContext);

	//handleFilterBySize
	const handleFilterBySize = event => {
		const parent = event.target.parentElement;
		const size = event.target.textContent;
		Object.values(parent.children).forEach(div => div.classList.remove('active'));
		event.target.classList.add('active');

		if (size === 'All') {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(p => p.sizes.includes(size));
			setProducts(newProducts);
		}
	};

	// handle filter by color
	const handleFilterByColor = event => {
		const color = event.target.style.backgroundColor;
		const parent = event.target.parentElement;
		Object.values(parent.children).forEach(div => div.classList.remove('active'));
		event.target.classList.add('active');

		if (event.target.textContent === 'All') {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(ele => ele.colors.includes(color));
			setProducts(newProducts);
		}
	};

	// handle filter by categories
	const handleFilterByCategory = e => {
		//set the active class for clicked element
		let target = e.target.innerHTML.toLowerCase();
		let parent = e.target.parentElement;
		Object.values(parent.children).forEach(ele => {
			ele.classList.remove('active');
		});
		e.target.classList.add('active');
		//logic filtering by category
		if (target === 'all') {
			setProducts(productsClone);
		} else {
			const newProducts = [...productsClone].filter(p => p.category === target);
			setProducts(newProducts);
		}
	};
	//handle Filter By Sort
	const handleFilterBySort = event => {
		let order = event.target.textContent;
		let parent = event.target.parentElement;
		Object.values(parent.children).forEach(ele => {
			ele.classList.remove('active');
		});
		event.target.classList.add('active');

		if (order === 'All') {
			setProducts(productsClone);
		} else {
			let newProducts = [...products].sort((current, next) => {
				if (order === 'Lowest') {
					return current.price - next.price;
				} else if (order === 'Highest') {
					return next.price - current.price;
				} else if (order === 'Latest') {
					return current._id > next._id ? -1 : 1;
				}
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
			}}
		>
			{children}
		</filterContext.Provider>
	);
};

export default FilterProvider;
