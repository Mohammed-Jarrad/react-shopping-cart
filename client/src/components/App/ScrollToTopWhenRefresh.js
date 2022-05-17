import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopWhenRefresh = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [location.pathname]);

	return null;
};

export default ScrollToTopWhenRefresh;
