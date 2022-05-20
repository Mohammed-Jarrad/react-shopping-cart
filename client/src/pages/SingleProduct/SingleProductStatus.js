import React, { useContext, useState } from 'react';
import { HomeContext } from '../../Context/HomeProvider';
import { PutRequest } from '../../utils/requests';
import { FaEdit } from 'react-icons/fa';
import { UserContext } from '../../Context/UserProvider';

const SingleProductStatus = () => {
	//variables
	const allStatus = ['Available', 'Not Available'];
	//context
	const { product, forceUpdate } = useContext(HomeContext);
	const { admin } = useContext(UserContext);

	// states
	const [showChangeStatus, setShowChangeStatus] = useState(false);

	// changeProductStatus
	const changeProductStatus = async e => {
		const status = e.target.textContent;
		try {
			const res = await PutRequest(`/product/${product._id}`, JSON.stringify({ ...product, status }));
			const data = await res.json();
			console.log(data);
			if (data.product) {
				forceUpdate();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="single-product-status">
			{Object.keys(product).length > 0 && (
				<div className={`status`}>
					<div className="info">
						Product Status:
						<span className={` ${product.status}`}> {product.status}</span>
					</div>

					{admin && (
						<div className="change" onClick={_ => setShowChangeStatus(show => !show)}>
							<div className="icon">
								<FaEdit />
							</div>

							<div className={`drop-menu ${showChangeStatus && 'show-menu'}`}>
								{allStatus
									.filter(item => item !== product.status)
									.map((item, index) => (
										<div key={index} className={`item`} onClick={changeProductStatus}>
											{item}
										</div>
									))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SingleProductStatus;
