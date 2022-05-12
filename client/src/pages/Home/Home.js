// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Filter from '../../components/Filter/Filter';
import Products from '../../components/Products/Products';
import '../../css/Home/Home.css';
import Loading from '../../components/Loading/Loading';
import SearchBox from '../../components/SearchBox/SearchBox';
import { HomeContext } from '../../Context/HomeProvider';

const Home = () => {
	// ! context
	const { loading, setLoading } = useContext(HomeContext).config;

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />

			<main>
				<div className="home container">
					<SearchBox />
					<Filter />
					<Products />
				</div>
			</main>
		</React.Fragment>
	);
};

export default Home;
