import React, {useEffect, useContext} from "react";
import Filter from "../../components/Filter/Filter";
import Products from "../../components/Products/Products";
import "../../css/Home/Home.css";
import Loading from "../../components/Loading/Loading";
import SuccessMsg from "../../components/SuccessMsg/SuccessMsg";
import SearchBox from "../../components/SearchBox/SearchBox";
import {HomeContext} from "../../Context/HomeProvider";

const Home = () => {
	// ! context
	const {get_products_categories_colors_sizes, ignore, setAlertProductDeleted, alertProductDeleted} =
		useContext(HomeContext);
	const {loading, setLoading} = useContext(HomeContext).config;

	useEffect(() => {
		get_products_categories_colors_sizes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ignore]);

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
