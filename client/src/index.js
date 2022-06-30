import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './components/App/Index';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Index />
	</BrowserRouter>,
	document.getElementById('root'),
);
