import React, {createContext, useContext, useReducer, useState} from 'react';
import mainMethods from '../utils/mainMethods';
import {CartContext} from './CartProvider';

export const HomeContext = createContext();

const HomeProvider = ({children}) => {
	//context
	const {setCart} = useContext(CartContext);
	// states
	const [products, setProducts] = useState([]);
	const [productsClone, setProductsClone] = useState([]);
	const [product, setProduct] = useState({});
	const [categories, setCategories] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
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
			// ! get get Categories
			const data_categories = await mainMethods.getCategories();
			// ! get colors & sizes
			const data_colors_sizes = await mainMethods.getSizesAndColors();
			//
			if (data.products) {
				setProducts(data.products);
				setProductsClone(data.products);
				setCategories(data_categories.categories);
				setColors(data_colors_sizes.colors);
				setSizes(data_colors_sizes.sizes);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	// getProduct
	const getProduct = async id => {
		try {
			const data = await mainMethods.getProduct(id);
			data.product && setProduct(data.product);
		} catch (error) {
			console.log(error);
		}
	};

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
				getProduct,
				products,
				setProducts,
				product,
				setProduct,
				productsClone,
				setProductsClone,
				// singleProduct,
				// setSingleProduct,
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
