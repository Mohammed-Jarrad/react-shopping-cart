import React, {useContext, useState} from 'react';
import '../../css/Filter/Filter.css';
import {AiOutlineBars} from 'react-icons/ai';
import {IoIosRemoveCircleOutline} from 'react-icons/io';
import {Backdrop} from '@mui/material';
import {HomeContext} from '../../Context/HomeProvider';
import {filterContext} from '../../Context/FilterProvider';

const orderOptions = [
	{content: 'All', alue: 'all'},
	{content: 'Latest', value: 'latest'},
	{content: 'Lowest', value: 'lowest'},
	{content: 'Highest', value: 'highest'},
];

const Filter = () => {
	// Context
	const {categories, sizes, colors} = useContext(HomeContext);
	const {handleFilterBySize, handleFilterByColor, handleFilterByCategory, handleFilterBySort} =
		useContext(filterContext);

	// states
	const [move, setMove] = useState(false);

	const handleClickOnCategory = e => {
		handleFilterByCategory(e);
		setMove(false);
	};

	const handleClickOnSize = e => {
		handleFilterBySize(e);
		setMove(false);
	};

	const handleClickOnColor = e => {
		handleFilterByColor(e);
		setMove(false);
	};

	return (
		<>
			<Backdrop open={move} onClick={() => setMove(false)} style={{zIndex: '111'}} />

			<div className={`filter-wrapper ${move ? 'move' : ''}`}>
				<div className={`filter-content`}>
					<div className='title filter-title' onClick={() => setMove(!move)}>
						Filter
						{move ? (
							<IoIosRemoveCircleOutline className='show-icon' />
						) : (
							<AiOutlineBars className='hide-icon' />
						)}
					</div>

					<div className='title'>Category</div>
					<div className='filter-by-category'>
						<div className='filter-items' onClick={handleClickOnCategory}>
							All
						</div>
						{categories
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
									handleFilterBySort(event);
									setMove(false);
								}}
								key={i}
							>
								{e.content}
							</div>
						))}
					</div>

					<div className='title'>Colors</div>
					<div className='filter-by-color'>
						<div className='filter-items' onClick={handleClickOnColor}>
							All
						</div>
						{colors &&
							colors.map((color, i) => (
								<div
									className='filter-items'
									onClick={handleClickOnColor}
									style={{
										backgroundColor: `${color}`,
									}}
									key={i}
								></div>
							))}
					</div>

					<div className='title'>Sizes</div>
					<div className='filter-by-size'>
						<div className='filter-items' onClick={handleClickOnSize}>
							All
						</div>
						{sizes &&
							sizes.map((e, i) => (
								<div className='filter-items' onClick={handleClickOnSize} key={i}>
									{e}
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Filter;
