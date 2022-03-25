import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import Bounce from 'react-reveal/Bounce'

const Orders = () => {

    let [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders').then(res => setOrders(res.data))
    }, [])

    let removeOrder = (id) => {
        axios.delete(`/api/orders/${id}`)
        axios.get('/api/orders').then(res => setOrders(res.data))
    }

    return (
        <div className='orders container'>
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
                            <tr key={index}>
                                <td><span>{index + 1}</span></td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className='details'>
                                    {item.orderInfo.map((p, i) => {
                                        return (
                                            <span key={p._id}>
                                                <p> {p.title} </p>
                                                <p> {p.quantity} </p>
                                            </span>
                                        )
                                    })}
                                </td>
                                <td>
                                    <button onClick={() => removeOrder(item._id)}>
                                        <span>&times;</span>
                                    </button>
                                </td>
                            </tr>
                        )) : false}
                    </tbody>
                </Bounce>
            </table>
        </div>
    )
}

export default Orders