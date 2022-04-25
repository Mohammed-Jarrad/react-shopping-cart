import React, { useEffect, useRef, useState } from 'react';
import '../../css/Filter/Filter.css';
import { NavLink } from 'react-router-dom';
import { BiRightArrow } from 'react-icons/bi';
import { Select, MenuItem } from '@mui/material';

const orderOptions = [
	{ content: 'ALL', value: 'all' },
	{ content: 'Latest', value: 'latest' },
	{ content: 'Lowest', value: 'lowest' },
	{ content: 'Highest', value: 'highest' },
];

const Filter = ({
	handleFilterBySort,
	sort,
	products,
	categories,
	handleFilterByCategory,
	handleFilterBySize,
	size,
	allSizes,
}) => {
	// states
	const [move, setMove] = useState(false);
	const filterRef = useRef();
	const selectRef = useRef();

	const hideFilter = e => {
		if (localStorage.user) {
			if (filterRef.current.contains(e.target) || filterRef.current.contains(selectRef.current)) {
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

	return (
		<>
			{products.length ? (
				<div className={`filter-wrapper ${move ? 'move' : ''}`} ref={filterRef}>
					<div className={`filter-content`}>
						<div className='arrow-to-left' onClick={() => setMove(!move)}>
							<BiRightArrow />
						</div>

						<div className='title'>Category</div>
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

						<div className='title'>Order</div>
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

						<div className='title'>Sizes</div>
						<div className='filter-by-size'>
							<Select
								className='select-size'
								ref={selectRef}
								label='Sizes'
								value={`${size ? size : 'Sizes'}`}
								onChange={e => {
									handleFilterBySize(e);
									setMove(false);
								}}
							>
								<MenuItem value={'All'}>ALL</MenuItem>
								{allSizes.map((size, i) => (
									<MenuItem key={i} value={size}>
										{size.toUpperCase()}
									</MenuItem>
								))}
							</Select>
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
