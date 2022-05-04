import React from 'react';

const ProductBoxInfo = ({product}) => {
	return (
		<div className='product-information'>
			<p className='desc'>
				<span>{product.desc}</span>
			</p>
			<div className='product-info-box'>
				<div className='price'>
					Price
					<span>{product.price}$</span>
				</div>

				<div className='category'>
					Category
					<span>{product.category}</span>
				</div>
				{product.sizes && product.sizes.length ? (
					<div className='sizes'>
						Sizes
						<div className='items'>
							{product.sizes.map((size, i) => (
								<span key={i}>{size}</span>
							))}
						</div>
					</div>
				) : null}

				<div className='colors'>
					Colors
					<div className='items'>
						{product.colors
							? product.colors.map((color, i) => <span style={{backgroundColor: `${color}`}} key={i}></span>)
							: null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductBoxInfo;
