import {DeleteRequest, GetRequest, PostRequest, PutRequest} from './requests';

// products
const getProducts = async _ => await (await GetRequest('/products')).json(); // data
const getCategories = async _ => await (await GetRequest('/categories')).json(); // data
const getSizesAndColors = async _ => await (await GetRequest('/sizes-colors')).json(); // data
const deleteProduct = async id => await DeleteRequest(`/product/${id}`); // res
const UpdateProduct = async (id, body) => {
	return await (await PutRequest(`/product/${id}`, JSON.stringify(body))).json(); // data
};

// users
const getUsers = async _ => await (await GetRequest('/users')).json(); // data
const getUser = async _ => await (await GetRequest('/user')).json(); // data
const deleteUser = async _ => await DeleteRequest('/user'); // res
const signup = async user => await (await PostRequest('/signup', JSON.stringify(user))).json(); // data
const login = async user => await (await PostRequest('/login', JSON.stringify(user))).json(); // data
const updateUser = async newUser => await (await PutRequest('/user', JSON.stringify(newUser))).json(); // data
const comparePassword = async enterPassword => {
	return await (await PostRequest('/user/compare/password', JSON.stringify(enterPassword))).json(); // data
};
const changePassword = async newPassword => {
	return await PutRequest('/user/reset/password', JSON.stringify(newPassword)); // res;
};
const removeUser = async id => await DeleteRequest(`/user/${id}`); // res

// orders
const getOrdersForUser = async _ => await (await GetRequest('/orders/user')).json(); // data
const getOrders = async _ => await (await GetRequest('/orders')).json(); // data
const getOrder = async id => await (await GetRequest(`/order/${id}`)).json(); // data
const createOrder = async newOrder => await (await PostRequest('/order', JSON.stringify(newOrder))).json(); // data
const deleteOrder = async id => await DeleteRequest(`/order/${id}`); // res
const deleteProductsFromOrders = async id => await PutRequest(`/orders/remove-product/${id}`); // res
const deleteAllOrdersWithoutProducts = async _ => await DeleteRequest(`/orders/remove-empty-orders`); // data
const deleteProductFromOrder = async (id, color, size) => {
	return await (await PutRequest(`/order/remove-product/${id}`, JSON.stringify({color, size}))).json(); // data
};
const deleteAllOrdesWithUserNull = async _ => await DeleteRequest('/orders-with-user-null'); // res

const mainMethods = {
	getProducts,
	deleteProduct,
	getCategories,
	getSizesAndColors,
	UpdateProduct,
	signup,
	login,
	getUser,
	getUsers,
	deleteUser,
	updateUser,
	removeUser,
	comparePassword,
	changePassword,
	getOrdersForUser,
	getOrders,
	getOrder,
	deleteOrder,
	deleteProductFromOrder,
	deleteProductsFromOrders,
	deleteAllOrdersWithoutProducts,
	createOrder,
	deleteAllOrdesWithUserNull,
};

export default mainMethods;
