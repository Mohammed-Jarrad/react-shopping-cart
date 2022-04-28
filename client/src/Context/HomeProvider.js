import React, { createContext, useContext, useReducer, useState } from 'react';
import mainMethods from '../utils/mainMethods';
import { CartContext } from './CartProvider';

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
	//context
	const { setCart } = useContext(CartContext);
	// states
	const [products, setProducts] = useState([]);
	const [productsClone, setProductsClone] = useState([]);
	const [categories, setCategories] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
	const [singleProduct, setSingleProduct] = useState({});
	const [alertProductDeleted, setAlertProductDeleted] = useState(false);
	const [chosenSize, setChosenSize] = useState('');
	const [chosenColor, setChosenColor] = useState('');
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);
	// config
	const [loading, setLoading] = useState(false);

	// get products && colors && sizes && categories
	async function get_products_categories_colors_sizes() {
		setLoading(true);
		try {
			// ! get products
			const data = await mainMethods.getProducts();
			setProducts(data.products);
			setProductsClone(data.products);
			// ! get get Categories
			const data_categories = await mainMethods.getCategories();
			setCategories(data_categories.categories);
			// ! get colors & sizes
			const data_colors_sizes = await mainMethods.getSizesAndColors();
			setColors(data_colors_sizes.colors);
			setSizes(data_colors_sizes.sizes);
			//
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	// remove product
	async function removeProduct(id) {
		setLoading(true);
		try {
			await mainMethods.deleteProductsFromOrders(id);
			const res = await mainMethods.deleteProduct(id);
			if (res.status === 202) {
				await mainMethods.deleteAllOrdersWithoutProducts();
				setCart([]);
				setLoading(false);
				setAlertProductDeleted(true);
				forceUpdate();
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	return (
		<HomeContext.Provider
			value={{
				get_products_categories_colors_sizes,
				products,
				setProducts,
				productsClone,
				setProductsClone,
				singleProduct,
				setSingleProduct,
				categories,
				setCategories,
				colors,
				setColors,
				sizes,
				setSizes,
				removeProduct,
				ignore,
				alertProductDeleted,
				chosenSize,
				setChosenSize,
				chosenColor,
				setChosenColor,
				config: {
					loading,
					setLoading,
				},
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};

export default HomeProvider;
