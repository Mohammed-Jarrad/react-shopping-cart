import React, { useEffect, useRef } from 'react';
import { sizeOptions } from '../CreateProduct/CreateProduct';

const SizesOptions = ({ sizes, setSizes }) => {
	// ref
	const sizesItemsRef = useRef();

	// handle click size
	const handleClickSize = e => {
		const size = e.target.textContent.toLowerCase();
		const sizesClone = [...sizes];

		if (e.target.classList.contains('active')) {
			sizesClone.splice(sizes.indexOf(size), 1);
			setSizes(sizesClone);
		} else {
			sizesClone.push(size);
			setSizes(sizesClone);
		}
		e.target.classList.toggle('active');
	};

	//
	useEffect(() => {
		const sizes_spans = [...sizesItemsRef.current.children];
		sizes_spans.forEach(span => {
			if (sizes.includes(span.textContent.toLowerCase())) {
				span.classList.add('active');
			}
		});
	}, [sizes]);

	return (
		<div className="sizes">
			Select Sizes...
			<div className="sizes-items" ref={sizesItemsRef}>
				{sizeOptions.map((size, i) => {
					return (
						<span className={`size-item`} key={i} onClick={e => handleClickSize(e)}>
							{size.label}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default SizesOptions;
