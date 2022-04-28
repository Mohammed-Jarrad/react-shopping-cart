import React, {useEffect, useState, useContext} from 'react';
import Cart from '../../components/Cart/Cart';
import Filter from '../../components/Filter/Filter';
import ProductModal from './ProductModal';
import Products from '../../components/Products/Products';
import '../../css/Home/Home.css';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import SelectColorAndSize from './SelectColorAndSize';
import SearchBox from './SearchBox';
import {HomeContext} from '../../Context/HomeProvider';

const Home = () => {
	// ! context
	const {
		get_products_categories_colors_sizes,
		setSingleProduct,
		ignore,
		setAlertProductDeleted,
		alertProductDeleted,
		setChosenColor,
		setChosenSize,
	} = useContext(HomeContext);
	const {loading, setLoading} = useContext(HomeContext).config;

	// ! states
	const [showProductModal, setShowProductModal] = useState(false);
	const [showCustomise, setShowCustomise] = useState(false);

	useEffect(() => {
		get_products_categories_colors_sizes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ignore]);

	const closeProductModal = () => {
		setSingleProduct(false);
		setShowProductModal(false);
	};

	const openProductModal = product => {
		setSingleProduct(product);
		setShowProductModal(true);
	};

	const openCustomiseModal = product => {
		setSingleProduct(product);
		setShowCustomise(true);
	};
	const closeCustomiseModal = () => {
		setShowCustomise(false);
		setShowProductModal(false);
		setSingleProduct(false);
		setChosenSize('');
		setChosenColor('');
	};

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg msg={'Product Deleted !'} open={alertProductDeleted} setOpen={setAlertProductDeleted} />

			<main>
				<div className='home container'>
					<SearchBox />
					<Filter />
					<Products openProductModal={openProductModal} openCustomiseModal={openCustomiseModal} />
					<Cart openProductModal={openProductModal} />
				</div>
			</main>

			<ProductModal
				open={showProductModal}
				close={closeProductModal}
				openCustomiseModal={openCustomiseModal}
			/>
			<SelectColorAndSize open={showCustomise} close={closeCustomiseModal} />
		</React.Fragment>
	);
};

export default Home;
