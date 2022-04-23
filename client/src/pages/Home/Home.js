import React, { useEffect, useReducer, useState } from 'react';
import Cart from '../../components/Cart/Cart';
import Filter from '../../components/Filter/Filter';
import ProductModal from '../../components/Products/ProductModal';
import Products from '../../components/Products/Products';
import { DeleteRequest, GetRequest, PutRequest } from '../../utils/requests';
import '../../css/Home/Home.css';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [productsClone, setProductsClone] = useState([]);
	// const [size, setSize] = useState('');
	const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
	const [singleProduct, setSingleProduct] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState('');
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [alertProductDeleted, setAlertProductDeleted] = useState(false);
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

	// * get Products And Categories
	async function getProductsAndCategories() {
		setLoading(true);
		try {
			//get all products
			const resProducts = await GetRequest('/products');
			const dataProducts = await resProducts.json();
			console.log(resProducts);
			console.log(dataProducts);
			//get all categories
			const resCategories = await GetRequest('/categories');
			const dataCategories = await resCategories.json();
			console.log(resCategories);
			console.log(dataCategories);
			if (dataProducts.products && dataCategories.categories) {
				setProducts(dataProducts.products);
				setProductsClone(dataProducts.products);
				setCategories(dataCategories.categories);
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
		getProductsAndCategories();
	}, [ignore]);

	// * Remove Product
	async function removeProduct(id) {
		setLoadingDelete(true);
		try {
			// delete this product drom all orders contains this product
			const res_delete_from_order = await PutRequest(`/order/remove-product/${id}`);
			const data_delete_from_order = await res_delete_from_order.json();
			console.log(res_delete_from_order);
			console.log(data_delete_from_order);
			//delete product
			const res = await DeleteRequest(`/product/${id}`);
			console.log(res);
			if (res.status === 202) {
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

	const closeModal = () => {
		setSingleProduct(false);
		setIsOpen(false);
	};

	const showProduct = singleProduct => {
		setSingleProduct(singleProduct);
		setIsOpen(true);
	};

	const addToCart = singleProduct => {
		const cartClone = [...cart];
		let productExist = false;
		cartClone.forEach(element => {
			if (element._id === singleProduct._id) {
				productExist = true;
				element.qty += 1;
			}
		});
		if (!productExist) {
			cartClone.push({
				...singleProduct,
				qty: 1,
			});
		}
		setCart(cartClone);
	};

	// const handleFilterBySize = e => {
	// 	setSize(e.target.value);
	// 	if (e.target.value === 'ALL') {
	// 		getProductsAndCategories();
	// 	} else {
	// 		const newProducts = productsClone.filter(p => p.sizes.includes(e.target.value));
	// 		newProducts.length
	// 			? setProducts(newProducts)
	// 			: setProducts(`NO ITEM TO SHOW WITH [${e.target.value}]`);
	// 	}
	// };

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

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<Loading open={loadingDelete} setOpen={setLoadingDelete} />
			<SuccessMsg msg={'Product Deleted !'} open={alertProductDeleted} setOpen={setAlertProductDeleted} />
			<main>
				<div className='home'>
					<Filter
						// handleFilterBySize={handleFilterBySize}
						handleFilterBySort={handleFilterBySort}
						// size={size}
						products={products}
						categories={categories}
						handleFilterByCategory={handleFilterByCategory}
					/>
					<div className='container'>
						<Products addToCart={addToCart} products={products} showProduct={showProduct} />
						<Cart cart={cart} setCart={setCart} showProduct={showProduct} products={products} />
					</div>
				</div>

				<ProductModal
					removeProduct={removeProduct}
					addToCart={addToCart}
					isOpen={isOpen}
					singleProduct={singleProduct}
					closeModal={closeModal}
				/>
			</main>
		</React.Fragment>
	);
};

export default Home;
