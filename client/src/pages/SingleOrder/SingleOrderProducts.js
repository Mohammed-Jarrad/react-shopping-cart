import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { HomeContext } from "../../Context/HomeProvider";
import { OrdersContext } from "../../Context/OrdersProvider";

const SingleOrderProducts = ({ order }) => {
	//context
	const { finalPrice, discountPrice } = useContext(HomeContext);
	const { removeProductFromOrder, loading, setLoading } = useContext(OrdersContext);

	//variables
	const { order_info } = order;
	const navigate = useNavigate();

	return (
		<div className="single-order-products">
			<>
				{order_info.map((item, i) => {
					return (
						<div className="product-item" key={i}>
							<div className="item">
								<div className="image">
									{discountPrice(item.product) !== item.product.price && (
										<span className="product-discount">{`${item.product.discount}%`}</span>
									)}
									<img
										src={item.product.imageUrl}
										onClick={() => navigate(`/product/${item.product._id}`)}
										alt="product figure"
									/>
									<div className="title">{item.product.title}</div>
								</div>

								<div className="product-info">
									<div className="price">
										<span>Price</span>
										<span>{finalPrice(item.product)}</span>
									</div>
									<div className="qty">
										<span>Quantity</span>
										<span>{item.quantity}</span>
									</div>
									<>
										{item.selected_color ? (
											<div className="color">
												<span>Color</span>
												<span
													style={{
														background: item.selected_color,
														width: "20px",
														height: "20px",
														border: "var(--main-border)",
													}}
												/>
											</div>
										) : null}
									</>
									<>
										{item.selected_size ? (
											<div className="size">
												<span>Size</span>
												<span>{item.selected_size}</span>
											</div>
										) : null}
									</>
								</div>
							</div>

							<button
								onClick={() =>
									removeProductFromOrder(item.product._id, item.selected_color, item.selected_size)
								}
							>
								Remove
							</button>
						</div>
					);
				})}

				<Loading open={loading} setOpen={setLoading} />
			</>
		</div>
	);
};

export default SingleOrderProducts;
