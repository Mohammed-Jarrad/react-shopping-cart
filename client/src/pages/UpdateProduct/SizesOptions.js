import React, { useEffect, useRef } from 'react';
import { sizeOptions } from '../CreateProduct/CreateProduct';

const SizesOptions = ({ handleClickSize, sizes }) => {
	// ref
	const sizesItemsRef = useRef();
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
