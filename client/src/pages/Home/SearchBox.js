import React, { useContext } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { HomeContext } from '../../Context/HomeProvider';

const SearchBox = () => {
	//context
	const { productsClone, setProducts } = useContext(HomeContext);

	// handle change search input
	const handleChange = e => {
		const value = e.currentTarget.value.toLowerCase().split(' ').join('');
		if (value) {
			const searchClone = [...productsClone].filter(
				product =>
					product.title.toLowerCase().split(' ').join('').includes(value) ||
					product.category.toLowerCase().split(' ').join('').includes(value),
			);
			setProducts(searchClone);
		} else {
			setProducts(productsClone);
		}
	};

	return (
		<div className='search'>
			<div className='box'>
				<span>
					<RiSearch2Line />
				</span>
				<input type='search' placeholder='Search Name or Category' onChange={handleChange} />
			</div>
		</div>
	);
};

export default SearchBox;
