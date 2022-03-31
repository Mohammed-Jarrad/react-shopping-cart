import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import Bounce from 'react-reveal/Bounce'
import Loading from '../components/Loading/Loading'
import { AiOutlineDelete } from 'react-icons/ai'

const Orders = () => {

    let [orders, setOrders] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/orders')
            .then(res => {
                setOrders(res.data)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [setLoading])

    let removeOrder = (id) => {
        axios.delete(`/api/orders/${id}`)
        axios.get('/api/orders').then(res => setOrders(res.data))
    }

    return (
        <div className='orders container'>
            {
                orders.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <Bounce bottom cascade>
                            <tbody>
                                {orders.length ? orders.map((item, index) => (
                                    <tr key={item._id}>
                                        <td><span>{index + 1}</span></td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td className='details'>
                                            <span>
                                                {
                                                    item.orderInfo.map((p, i) => {
                                                        return (

                                                            <div key={p._id}>
                                                                <p> {p.title} </p> -
                                                                <p> {p.quantity} </p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={() => removeOrder(item._id)}>
                                                {/* <span>&times;</span> */}
                                                <AiOutlineDelete />
                                            </button>
                                        </td>
                                    </tr>
                                )) : false}
                            </tbody>
                        </Bounce>
                    </table>
                ) : (
                    <div>
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <h1 className='no-orders-msg'>
                                    No Items To Show Now Please Check Your Cart
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