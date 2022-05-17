// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Filter from '../../components/Filter/Filter';
import Products from '../../components/Products/Products';
import '../../css/Home/Home.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import { HomeContext } from '../../Context/HomeProvider';
import Loading from '../../components/Loading/Loading';

const Home = () => {
	const { loading, setLoading } = useContext(HomeContext).config;
	const { products } = useContext(HomeContext);

	return (
		<>
			<main>
				<div className="home container">
					<SearchBox />
					<Filter />
					<Products products={products} />
				</div>
			</main>

			<Loading open={loading} setOpen={setLoading} />
		</>
	);
};

export default Home;
