import React, { useState, useEffect } from 'react';
import '../../css/Scrolling/Scrolling.css';
import { BsCloudArrowUpFill } from 'react-icons/bs';

const ScrollToTop = () => {
	// states
	const [showTopButton, setShowTopButton] = useState(false);

	useEffect(_ => {
		window.addEventListener('scroll', _ => {
			if (window.scrollY >= 300) {
				setShowTopButton(true);
			} else {
				setShowTopButton(false);
			}
		});
	}, []);

	const handleGoTop = _ => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<span className='go-top' style={{ display: `${showTopButton ? 'block' : 'none'}` }} onClick={handleGoTop}>
			<BsCloudArrowUpFill />
		</span>
	);
};

export default ScrollToTop;
