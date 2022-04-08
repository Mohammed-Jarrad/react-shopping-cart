import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import Bounce from 'react-reveal/Bounce'
import Loading from '../components/Loading/Loading'
import { AiOutlineDelete } from 'react-icons/ai'
import { DeleteRequest, GetRequest } from '../utils/requests'

const Orders = () => {

    // ! my states
    const user = JSON.parse(localStorage.user);
    const [ordersForUser, setOrdersForUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [alertDeleteMsg, setAlertDeleteMsg] = useState('');
    const userName = `${user.name.first_name}${user.name.last_name}`
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

    return (
        <div className='orders container'>

            {alertDeleteMsg ? alertDeletedSuccess() : ""}

            {
                ordersForUser.length ? (
                    <>
                        <h1>{userName} Orders</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Details</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <Bounce bottom cascade>
                                <tbody>
                                    {
                                        ordersForUser.map((order, index) => (
                                            <tr key={order._id}>

                                                <td><span>{index + 1}</span></td>
                                                <td className='details'>
                                                    <span>
                                                        {
                                                            order.order_info.map((info, i) => {
                                                                return (
                                                                    <div key={info._id}>
                                                                        <p> {info.product.title} </p> -
                                                                        <p> {info.quantity} </p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <button onClick={() => removeOrder(order._id)}>
                                                        <AiOutlineDelete />
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                </tbody>
                            </Bounce>
                        </table>
                    </>
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