import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ColorsOptions = ({ colorRef, handleClickColor, colors, removeColor }) => {
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
