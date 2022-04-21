import React from 'react';
import Modal from 'react-modal';
import '../../css/Products/Products.css';

Modal.setAppElement('#root');

const ProductModal = ({ singleProduct, isOpen, closeModal, addToCart, removeProduct }) => {
	return (
		<Modal
			overlayClassName='overlay-modal'
			className='modal product-modal'
			isOpen={isOpen}
			closeTimeoutMS={250}
			onRequestClose={closeModal}
		>
			<span className='close-icon' onClick={closeModal}>
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
					</div>
				</div>
				<div className='modal-options'>
					<button className='close' onClick={closeModal}>
						Close
					</button>
					<button
						className='add'
						onClick={() => {
							addToCart(singleProduct);
							closeModal();
						}}
					>
						Add To Cart
					</button>
					<button
						className='delete'
						onClick={() => {
							closeModal();
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
