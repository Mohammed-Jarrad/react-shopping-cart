/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useLayoutEffect, useReducer, useState } from 'react';
import mainMethods from '../utils/mainMethods';
import { CartContext } from './CartProvider';

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
	//context
	const { setCart } = useContext(CartContext);
	// states
	const [products, setProducts] = useState([]);
	const [productsClone, setProductsClone] = useState([]);
	const [product, setProduct] = useState({});
	const [topRating, setTopRating] = useState([]);
	const [bigDiscountProducts, setBigDiscountProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [SingleCategoryProducts, setSingleCategoryProducts] = useState([]);
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
			const data = await mainMethods.getProducts();
			if (data.products) {
				setProducts(data.products);
				setProductsClone(data.products);
				getCategoriesAndColorsAndSizes(data.products);
				getTopRatingsProducts(data.products);
				getBigDiscountProducts(data.products);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useLayoutEffect(() => {
		get_products_categories_colors_sizes();
		console.log(' from Home provider getting .... ');
	}, [ignore]);

	// get colors and sizes and categories
	const getCategoriesAndColorsAndSizes = products => {
		let categories = [...products].map(p => p.category);
		let CWD = categories.filter((c, i, arr) => arr.indexOf(c) === i);
		setCategories(CWD);

		let sizes = [];
		let colors = [];
		[...products].forEach(product => {
			[...product.sizes].forEach(size => sizes.push(size));
			[...product.colors].forEach(color => colors.push(color));
		});

		const sizesWithoutDuplicate = sizes.filter((size, index, arr) => arr.indexOf(size) === index);
		setSizes(sizesWithoutDuplicate);

		const colorsWithoutDuplicate = colors.filter((color, index, arr) => arr.indexOf(color) === index);
		setColors(colorsWithoutDuplicate);
	};
	// find max element
	function findMaxElementInArray(arr) {
		const array = [...arr];
		if (array.length === 0) return null;

		return array.reduce((a, b, i, arr) => {
			return arr.filter(e => e === a).length >= arr.filter(e => e === b).length ? a : b;
		}, null);
	}

	// discount price
	const discountPrice = product => {
		const disPrice = Math.floor(product.price - product.price * (product.discount / 100));
		return disPrice;
	};

	// Final price
	const finalPrice = product => {
		const disPrice = discountPrice(product);
		if (disPrice === product.price) {
			return <span className="discount">{`$${product.price}`}</span>;
		} else {
			return (
				<span className="discount">
					<span className="discount-price">{`$${disPrice}`}</span>
					<span className="origin-price">{`$${product.price}`}</span>
				</span>
			);
		}
	};

	// getProduct
	const getProduct = async id => {
		setLoading(true);
		try {
			const data = await mainMethods.getProduct(id);
			if (data.product) {
				setProduct(data.product);
				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// get Product Ratings
	const getProductRatings = product => {
		return [...product.reviews].length ? [...product.reviews].map(item => item.rating) : [];
	};

	// get average rating
	const getAverageRating = product => {
		const ratings = getProductRatings(product);
		let countMap = {
			poor: { count: 0, value: 1 },
			fair: { count: 0, value: 2 },
			good: { count: 0, value: 3 },
			'very good': { count: 0, value: 4 },
			excellent: { count: 0, value: 5 },
		};
		if (ratings.length === 0) {
			return { value: 0, rate: '' };
		} else {
			ratings.forEach(rate => {
				countMap[rate]['count']++;
			});
			const allCount = Object.keys(countMap).reduce((acc, item) => {
				return acc + countMap[item].count * countMap[item].value;
			}, 0);
			const length = ratings.length;
			let averageRate = Math.round(allCount / length);

			return {
				value: averageRate,
				rate: Object.keys(countMap).find(key => countMap[key].value === averageRate),
			};
		}
	};

	// get top rating
	const getTopRatingsProducts = products => {
		let all = [...products];
		const maxRating = Math.max(...all.map(p => getAverageRating(p).value));

		let newArr = all.filter(
			p =>
				getAverageRating(p).value === maxRating ||
				getAverageRating(p).value === maxRating - 1 ||
				getAverageRating(p).value === maxRating - 2,
		);

		setTopRating(newArr);
	};

	const getBigDiscountProducts = products => {
		let disProducts = [...products].filter(product => product.discount >= 10);
		setBigDiscountProducts(disProducts);
	};

	const getCategoryProducts = (category, allProducts) => {
		const all = [...allProducts];
		const products = all.filter(p => p.category === category);
		setSingleCategoryProducts(products);
	};

	// remove product
	async function removeProduct(id) {
		setLoading(true);
		try {
			const res = await mainMethods.deleteProduct(id);
			if (res.status === 202) {
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
				discountPrice,
				finalPrice,
				setProduct,
				productsClone,
				setProductsClone,
				categories,
				setCategories,
				colors,
				forceUpdate,
				setColors,
				sizes,
				setSizes,
				removeProduct,
				ignore,
				alertProductDeleted,
				setAlertProductDeleted,
				chosenSize,
				setChosenSize,
				chosenColor,
				setChosenColor,
				findMaxElementInArray,
				getProductRatings,
				getAverageRating,
				getTopRatingsProducts,
				getBigDiscountProducts,
				bigDiscountProducts,
				setBigDiscountProducts,
				topRating,
				SingleCategoryProducts,
				getCategoryProducts,
				setSingleCategoryProducts,
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
