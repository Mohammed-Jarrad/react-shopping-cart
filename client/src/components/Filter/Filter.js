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
		setMove(false);
	};

	const orderOptions = [
		{ content: 'ALL', value: 'all' },
		{ content: 'Latest', value: 'latest' },
		{ content: 'Lowest', value: 'lowest' },
		{ content: 'Highest', value: 'highest' },
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
										handleFilterBySort(event, e.value);
										setMove(false);
									}}
									key={i}
								>
									{e.content}
								</div>
							))}
						</div>

						<NavLink className='create-product-btn' to={`/create-product`}>
							Create New Product
						</NavLink>
					</div>
				</div>
			) : (
				false
			)}
		</>
	);
};

export default Filter;
