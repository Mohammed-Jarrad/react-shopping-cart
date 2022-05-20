import React, { useState, useEffect } from 'react';
import '../../css/Scrolling/Scrolling.css';
import { BsCloudArrowUpFill } from 'react-icons/bs';

export const handleGoTop = _ => window.scrollTo({ top: 0, behavior: 'smooth' });

const ScrollToTop = () => {
	// states
	const [showTopButton, setShowTopButton] = useState(false);

	const handleScroll = _ => {
		if (window.scrollY >= 300) {
			setShowTopButton(true);
		} else {
			setShowTopButton(false);
		}
	};

	useEffect(_ => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<span className="go-top" style={{ display: `${showTopButton ? 'block' : 'none'}` }} onClick={handleGoTop}>
			<BsCloudArrowUpFill />
		</span>
	);
};

export default ScrollToTop;
