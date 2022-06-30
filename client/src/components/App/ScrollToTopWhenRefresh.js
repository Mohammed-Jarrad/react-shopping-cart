import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopWhenRefresh = ({ children }) => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [location.key]);

	return children;
};

export default ScrollToTopWhenRefresh;
