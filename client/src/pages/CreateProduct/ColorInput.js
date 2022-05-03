import {Alert} from '@mui/material';
import React from 'react';
import {FaTimes} from 'react-icons/fa';

const ColorInput = ({colorRef, colors, setColors, productError, setProductError}) => {
	// changes hex colors to rgb
	const hex2rgb = color => {
		const r = parseInt(color.substr(1, 2), 16);
		const g = parseInt(color.substr(3, 2), 16);
		const b = parseInt(color.substr(5, 2), 16);
		return `rgb(${r}, ${g}, ${b})`;
	};

	// add color
	const addColor = e => {
		e.preventDefault();
		setProductError(prev => ({...prev, colors: ''}));
		const myColor = colorRef.current.value;
		const myColor_rgb = hex2rgb(myColor);
		const colorsClone = [...colors];
		if (colorsClone.includes(myColor_rgb)) {
			return;
		} else {
			colorsClone.push(myColor_rgb);
			setColors(colorsClone);
		}
	};

	// remove color
	const removeColor = e => {
		const deletedColor = e.currentTarget.style.backgroundColor;
		const colorsClone = [...colors];
		colorsClone.splice(colorsClone.indexOf(deletedColor), 1);
		setColors(colorsClone);
	};

	return (
		<div className='colors'>
			<div className='colors-config'>
				<input className='color-input' type='color' name='color' id='color' ref={colorRef} />
				<button onClick={addColor}>Add Color</button>
				<div className='display-colors'>
					{colors.length
						? colors.map((color, i) => (
								<div
									key={i}
									style={{
										backgroundColor: `${color}`,
										border: `${color === 'rgb(255, 255, 255)' && '1px solid #c0c0c0'}`,
									}}
									onClick={removeColor}
								>
									<FaTimes color={`${color === 'rgb(0, 0, 0)' ? 'white' : 'black'}`} />
								</div>
						  ))
						: null}
				</div>
			</div>
			{productError.colors && (
				<Alert severity='error' className='error'>
					{productError.colors}
				</Alert>
			)}
		</div>
	);
};

export default ColorInput;
