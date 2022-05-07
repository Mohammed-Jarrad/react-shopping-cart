import React from "react";
import {sizeOptions} from "../CreateProduct/CreateProduct";

const SizesOptions = ({handleClickSize, product}) => {
	return (
		<div className="sizes">
			Select Sizes...
			<div className="sizes-items">
				{sizeOptions.map((size, i) => {
					return (
						<span className={`size-item`} key={i} onClick={e => handleClickSize(e)}>
							{size.label}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default SizesOptions;
