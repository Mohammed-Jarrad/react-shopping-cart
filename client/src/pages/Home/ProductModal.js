import React from 'react';
import Modal from 'react-modal';
import '../../css/Products/Products.css';

Modal.setAppElement('#root');

const ProductModal = ({
	singleProduct,
	showProductModal,
	closeProductModal,
	removeProduct,
	openCustomiseModal,
}) => {
	return (
		<Modal
			overlayClassName='overlay-modal'
			className='modal product-modal'
			isOpen={showProductModal}
			closeTimeoutMS={250}
			onRequestClose={closeProductModal}
		>
			<span className='close-icon' onClick={closeProductModal}>
				&times;
			</span>
			<div className='main-content'>
				<div className='product-info'>
					<img src={singleProduct.imageUrl} alt='product figure' />
					<div className='product-info-details'>
						<h2 className='title'>{singleProduct.title}</h2>

						<div className='desc'>
							Description: <div>{singleProduct.desc}</div>
						</div>

						<div className='price'>
							Price: <div>{singleProduct.price}$</div>
						</div>

						<div className='category'>
							Category: <div>{singleProduct.category}</div>
						</div>

						{singleProduct.sizes && singleProduct.sizes.length ? (
							<div className='sizes'>
								Sizes:{' '}
								{singleProduct.sizes.map((size, i) => (
									<span key={i}>{size}</span>
								))}
							</div>
						) : null}

						<div className='colors'>
							<div>Colors:</div>
							{singleProduct.colors
								? singleProduct.colors.map((color, i) => (
										<span className='color-item' style={{ backgroundColor: `${color}` }} key={i}></span>
								  ))
								: null}
						</div>
					</div>
				</div>
				<div className='modal-options'>
					<button className='close' onClick={closeProductModal}>
						Close
					</button>
					<button
						className='add'
						onClick={() => {
							openCustomiseModal(singleProduct);
						}}
					>
						Add To Cart
					</button>
					<button
						className='delete'
						onClick={() => {
							closeProductModal();
							removeProduct(singleProduct._id);
						}}
					>
						Delete Product
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ProductModal;
