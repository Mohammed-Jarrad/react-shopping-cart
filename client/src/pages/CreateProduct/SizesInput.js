import React, { useEffect, useRef, useState } from 'react';
import { sizeOptions } from './CreateProduct';
import { AiFillCaretRight } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const SizesInput = ({ setSizes, sizes }) => {
	// states
	const [showSizes, setShowSizes] = useState(false);
	const [inputValue, setInputValue] = useState('');
	//
	const sizeInputRef = useRef();
	const sizeMenuItems = useRef();

	useEffect(() => {
		Object.values(sizeMenuItems.current.children).forEach(p => {
			if (sizes.includes(p.textContent.toLowerCase())) {
				p.classList.add('active');
			} else {
				p.classList.remove('active');
			}
		});

		return () => null;
	}, [sizes]);

	//handleChangeInput
	const handleChangeInput = e => {
		setInputValue(e.target.value);
	};

	// clickOnMenuContent
	const clickOnMenuContent = e => {
		const value = e.target.textContent.toLowerCase();
		if (e.target.classList.contains('active')) {
			removeSize(value);
		} else {
			handleChangeSizes(value);
		}
	};

	//handleChangeSizes
	const handleChangeSizes = value => {
		if (!value) {
			return null;
		}
		const sizesClone = [...sizes];
		if (sizesClone.includes(value)) {
			return null;
		} else {
			sizesClone.push(value);
			setSizes(sizesClone);
		}
	};

	// remove size
	const removeSize = value => {
		const sizesClone = [...sizes];
		sizesClone.splice(sizesClone.indexOf(value), 1);
		setSizes(sizesClone);
	};

	return (
		<div className="sizes">
			<div className="view-sizes-select">
				{sizes.map((item, i) => (
					<p key={i}>
						{item}
						<span onClick={_ => removeSize(item)}>
							<FaTimes />
						</span>
					</p>
				))}
			</div>

			<div className="drop-menu">
				<div className="select">
					<form
						className="input"
						onSubmit={e => {
							e.preventDefault();
							handleChangeSizes(inputValue.toLowerCase().trim());
							setInputValue('');
							sizeInputRef.current.focus();
						}}
					>
						<input
							type="text"
							value={inputValue}
							onChange={handleChangeInput}
							placeholder="Enter Your Size..."
							ref={sizeInputRef}
						/>
						<button>Add Size</button>
					</form>
					<span onClick={_ => setShowSizes(!showSizes)}>
						<AiFillCaretRight className={showSizes && 'rotate'} />
					</span>
				</div>

				<div className={`menu-content ${showSizes && 'show'}`} ref={sizeMenuItems}>
					{sizeOptions.map((item, i) => (
						<p key={i} onClick={clickOnMenuContent}>
							{item.label}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default SizesInput;
