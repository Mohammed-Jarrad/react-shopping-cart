import React, { useEffect, useState } from 'react'
import '../../css/Orders/Orders.css'
import Bounce from 'react-reveal/Bounce'
import Loading from '../../components/Loading/Loading'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { DeleteRequest, GetRequest } from '../../utils/requests'
import FormEdit from './FormEdit'
import FormShowMore from './FormShowMore'

const Orders = () => {

    // ! my states
    const user = JSON.parse(localStorage.user);
    const [ordersForUser, setOrdersForUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [alertDeleteMsg, setAlertDeleteMsg] = useState('');
    const userName = `${user.name.first_name}${user.name.last_name}`
    const [showEditForm, setShowEditForm] = useState(false);
    const [showMoreForm, setShowMoreForm] = useState(false);
    // const [order, setOrder] = useState('');
    // ! get all orders for current user
    useEffect(() => {
        async function getOrdersForUser() {
            try {
                // const res = await requests.get('/orders/user');
                const res = await GetRequest('/orders/user');
                const data = await res.json();
                console.log('res ordersForUser:', res)
                console.log('data ordersForUser: ', data)
                if (data.orders) {
                    setOrdersForUser(data.orders);
                    setLoading(false);
                }
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getOrdersForUser();
    }, [])
    // ! get delete Message when delete order
    function alertDeletedSuccess() {
        return (
            <Bounce>
                <div className='alert-delete-msg'>
                    {alertDeleteMsg}
                </div>
            </Bounce>

        )
    }
    // ! remove order
    async function removeOrder(id) {
        try {
            const res = await DeleteRequest(`/order/${id}`);
            if (res.status === 202) {
                const response = await GetRequest('/orders/user');
                const data = await response.json();
                setOrdersForUser(data.orders);
                setAlertDeleteMsg('Deleted Done!');
                setTimeout(() => {
                    setAlertDeleteMsg('');
                }, 2500);
            }
        } catch (err) {
            console.log(err)
        }
    }
    // ! get single order
    // async function getOrder(id) {
    //     try {
    //         const res = await GetRequest(`/order/${id}`);
    //         const data = await res.json();
    //         // console.log('data for this order', data.order)
    //         if (data.order) {
    //             setOrder(data.order);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div className='orders container'>

            {alertDeleteMsg ? alertDeletedSuccess() : ""}

            {
                ordersForUser.length ? (
                    <React.Fragment>
                        <h1>{userName} Orders</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>Show More</th>
                                </tr>
                            </thead>
                            <Bounce bottom cascade>
                                <tbody>
                                    {
                                        ordersForUser.map((order, index) => (
                                            <React.Fragment key={order._id}>
                                                <tr>
                                                    <td className='number-order'>
                                                        {index + 1}
                                                    </td>
                                                    <td className='details'>
                                                        <span>
                                                            {
                                                                order.order_info.map(product => (
                                                                    <div key={product._id}>
                                                                        <p>{product.product.title}</p>
                                                                        <p>{product.quantity}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className='edit-order'>
                                                        <button onClick={() => {
                                                            setShowEditForm(true);
                                                            // getOrder();
                                                        }}>
                                                            <AiOutlineEdit />
                                                        </button>
                                                    </td>
                                                    <td className='delete-order'>
                                                        <button onClick={() => removeOrder(order._id)}>
                                                            <AiOutlineDelete />
                                                        </button>
                                                    </td>
                                                    <td className='show-more-order'>
                                                        <button onClick={() => {
                                                            setShowMoreForm(true);
                                                            // getOrder(order._id);
                                                        }}>
                                                            <BsFillArrowRightCircleFill />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <FormEdit
                                                    showEditForm={showEditForm}
                                                    setShowEditForm={setShowEditForm}
                                                    order={order}
                                                />
                                                <FormShowMore
                                                    showMoreForm={showMoreForm}
                                                    setShowMoreForm={setShowMoreForm}
                                                    order={order}
                                                />
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </Bounce>
                        </table>
                    </React.Fragment>
                ) : (
                    <div>
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <h1 className='no-orders-msg'>
                                    No orders to {userName}.
                                </h1>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Orders