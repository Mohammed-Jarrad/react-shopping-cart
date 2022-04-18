import React, { useEffect, useRef, useState } from 'react';
import '../../css/Filter/Filter.css';
import { NavLink } from 'react-router-dom';
import { BiRightArrow } from 'react-icons/bi';

const Filter = ({ handleFilterBySort, sort, products, categories, handleFilterByCategory }) => {
	// states
	const [move, setMove] = useState(false);
	const filterRef = useRef();

	const hideFilter = e => {
		if (localStorage.user) {
			if (filterRef.current.contains(e.target)) {
				return;
			} else setMove(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', hideFilter);

		return () => document.removeEventListener('mousedown', hideFilter);
	}, []);

	const handleClickOnCategory = e => {
		handleFilterByCategory(e);
	};

	const orderOptions = [
		{ name: 'ALL', value: 'all' },
		{ name: 'Latest', value: 'latest' },
		{ name: 'Lowest', value: 'lowest' },
		{ name: 'Highest', value: 'highest' },
	];

	return (
		<>
			{products.length ? (
				<div className={`filter-wrapper ${move ? 'move' : ''}`} ref={filterRef}>
					<div className={`filter-content`}>
						<div className='arrow-to-left' onClick={() => setMove(!move)}>
							<BiRightArrow />
						</div>

						<div className='category-title'>Category</div>
						<div className='filter-by-category'>
							<div className='filter-items' onClick={handleClickOnCategory}>
								All
							</div>
							{categories.length
								? categories.map((category, i) => (
										<div
											className='filter-items'
											key={i}
											onClick={handleClickOnCategory}
											defaultValue={category}
										>
											{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
										</div>
								  ))
								: null}
						</div>

						<div className='order-title'>Order</div>
						<div className='filter-by-order'>
							{orderOptions.map((e, i) => (
								<div
									className='filter-items'
									onClick={event => {
										handleFilterBySort(event, e['value']);
										// setMove(!move);
									}}
									key={i}
								>
									{e.name}
								</div>
							))}
						</div>

						<button className='create-product-btn'>
							<NavLink to={`/create-product`}>Create New Product</NavLink>
						</button>
					</div>
				</div>
			) : (
				false
			)}
		</>
	);
};

export default Filter;
