import React, { useEffect, useReducer, useState } from 'react';
import Cart from '../../components/Cart/Cart';
import Filter from '../../components/Filter/Filter';
import ProductModal from './ProductModal';
import Products from '../../components/Products/Products';
import { DeleteRequest, GetRequest, PutRequest } from '../../utils/requests';
import '../../css/Home/Home.css';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import SelectColorAndSize from './SelectColorAndSize';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [productsClone, setProductsClone] = useState([]);
	const [size, setSize] = useState('');
	const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
	const [singleProduct, setSingleProduct] = useState('');
	const [showProductModal, setShowProductModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState('');
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [alertProductDeleted, setAlertProductDeleted] = useState(false);
	const [showCustomise, setShowCustomise] = useState(false);
	const [allSizes, setAllSizes] = useState([]);
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

	// * get Products And Categories And All Sizes
	async function getProductsAndCategoriesAndSizes() {
		setLoading(true);
		try {
			//get all products
			const resProducts = await GetRequest('/products');
			const dataProducts = await resProducts.json();
			//get all categories
			const resCategories = await GetRequest('/categories');
			const dataCategories = await resCategories.json();
			//get all sizes
			const resSizes = await GetRequest('/sizes');
			const dataSizes = await resSizes.json();
			if (dataProducts.products && dataCategories.categories && dataSizes.sizes) {
				setProducts(dataProducts.products);
				setProductsClone(dataProducts.products);
				setCategories(dataCategories.categories);
				setAllSizes(dataSizes.sizes);
				setLoading(false);
			} else {
				setLoading(false);
				console.log(dataProducts.errors);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getProductsAndCategoriesAndSizes();
	}, [ignore]);

	// * remove product && remove this product from all orders contains it && remove all empty orders
	async function removeProduct(id) {
		setLoadingDelete(true);
		try {
			// delete this product from all orders contains this product
			await PutRequest(`/orders/remove-product/${id}`);
			//delete product
			const res = await DeleteRequest(`/product/${id}`);
			console.log(res);
			if (res.status === 202) {
				await DeleteRequest('/orders/remove-empty-orders'); // delete all empty orders
				setCart([]);
				setLoadingDelete(false);
				setAlertProductDeleted(true);
				forceUpdate();
			}
		} catch (error) {
			setLoadingDelete(false);
			console.log(error);
		}
	}

	const addToCart = (product, size, color) => {
		const cartClone = [...cart];
		let productExist = false;
		cartClone.forEach(item => {
			if (item._id === product._id && item.color === color && item.size === size) {
				productExist = true;
				item.qty += 1;
			}
		});
		if (!productExist) {
			cartClone.push({ ...product, qty: 1, size: size, color: color });
		}
		setCart(cartClone);
	};

	const handleFilterBySize = e => {
		setSize(e.target.value);
		if (e.target.value === 'All') {
			setProducts(productsClone);
		} else {
			const newProducts = productsClone.filter(p => p.sizes.includes(e.target.value));
			setProducts(newProducts);
		}
	};

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
			const newProducts = productsClone.filter(p => p.category === target);
			setProducts(newProducts);
		}
	};

	const handleFilterBySort = (event, value) => {
		let order = value;
		console.log(order);
		let parent = event.target.parentElement;
		Object.values(parent.children).forEach(ele => {
			ele.classList.remove('active');
		});
		event.target.classList.add('active');

		let newProducts = [...products].sort((current, next) => {
			if (order === 'lowest') {
				return current.price - next.price;
			} else if (order === 'highest') {
				return next.price - current.price;
			} else if (order === 'all') {
				return current._id < next._id ? -1 : 1;
			} else {
				return current._id > next._id ? -1 : 1;
			}
		});
		newProducts.length && setProducts(newProducts);
		console.log(newProducts);
	};

	const closeProductModal = () => {
		setSingleProduct(false);
		setShowProductModal(false);
	};

	const openProductModal = singleProduct => {
		setSingleProduct(singleProduct);
		setShowProductModal(true);
	};

	const openCustomiseModal = singleProduct => {
		setSingleProduct(singleProduct);
		setShowCustomise(true);
	};

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<Loading open={loadingDelete} setOpen={setLoadingDelete} />
			<SuccessMsg msg={'Product Deleted !'} open={alertProductDeleted} setOpen={setAlertProductDeleted} />
			<main>
				<div className='home'>
					<Filter
						handleFilterBySize={handleFilterBySize}
						handleFilterBySort={handleFilterBySort}
						size={size}
						products={products}
						categories={categories}
						handleFilterByCategory={handleFilterByCategory}
						allSizes={allSizes}
					/>
					<div className='container'>
						<Products
							products={products}
							openProductModal={openProductModal}
							openCustomiseModal={openCustomiseModal}
							loading={loading}
						/>
						<Cart cart={cart} setCart={setCart} openProductModal={openProductModal} products={products} />
					</div>
				</div>

				<ProductModal
					removeProduct={removeProduct}
					showProductModal={showProductModal}
					closeProductModal={closeProductModal}
					singleProduct={singleProduct}
					openCustomiseModal={openCustomiseModal}
				/>
				<SelectColorAndSize
					singleProduct={singleProduct}
					showCustomise={showCustomise}
					setShowCustomise={setShowCustomise}
					setSingleProduct={setSingleProduct}
					setShowProductModal={setShowProductModal}
					addToCart={addToCart}
				/>
			</main>
		</React.Fragment>
	);
};

export default Home;
