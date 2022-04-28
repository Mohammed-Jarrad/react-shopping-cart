import React from 'react';
import '../../css/Scrolling/Scrolling.css';
import { ImCart } from 'react-icons/im';

const ScrollToBottom = ({ cartRef }) => {
	const goToBottom = _ => {
		// window.scrollTo({ top: 10000000000, behavior: 'smooth' });
		window.scrollTo({ top: cartRef.current.offsetTop, behavior: 'smooth' });
	};

	return (
		<span className='go-to-cart' onClick={goToBottom} title='Go to Cart'>
			<ImCart />
		</span>
	);
};

export default ScrollToBottom;
