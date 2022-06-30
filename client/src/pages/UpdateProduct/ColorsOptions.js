import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { hex2rgb } from '../CreateProduct/ColorInput';

const ColorsOptions = ({ colorRef, colors, setColors }) => {
	// handle Click Color
	const handleClickColor = e => {
		e.preventDefault();
		const color = hex2rgb(colorRef.current.value);
		const colorsClone = [...colors];
		if (colorsClone.includes(color)) {
			return;
		} else {
			colorsClone.push(color);
			setColors(colorsClone);
		}
	};

	// remove color
	const removeColor = e => {
		const color = e.currentTarget.style.background;
		const colorsClone = [...colors];
		colorsClone.splice(colorsClone.indexOf(color), 1);
		setColors(colorsClone);
	};

	return (
		<div className="colors">
			<input type="color" ref={colorRef} />
			<button onClick={handleClickColor}>Add Color</button>
			{colors.map((color, i) => {
				return (
					<span className="color-item" key={i} style={{ background: `${color}` }} onClick={removeColor}>
						<FaTimes color={`${color === 'rgb(0, 0, 0)' ? 'white' : 'black'}`} />
					</span>
				);
			})}
		</div>
	);
};

export default ColorsOptions;
