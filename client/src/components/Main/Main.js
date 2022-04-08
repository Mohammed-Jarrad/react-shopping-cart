import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/Main/Main.css'
// import Requests from '../../utils/requests'
import { useNavigate } from 'react-router-dom'
import { GetRequest } from '../../utils/requests'
import { useContext } from 'react'
import { handleLoggedContext } from '../App/App'

const Main = () => {
    // const requests = new Requests();
    const [user] = useState(localStorage.user ? JSON.parse(localStorage.user) : '')
    // const navigate = useNavigate();
    const handleLogged = useContext(handleLoggedContext)

    // async function handleLogged() {
    //     try {
    //         // const res = await requests.get('/products')
    //         const res = await GetRequest('/products');
    //         console.log("handelLogged", res)
    //         if (res.status === 401) {
    //             navigate('/login');
    //         } else {
    //             navigate('/products');
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <div className='main-page'>
            <div className='content'>
                {
                    typeof user === "object"
                        ? <h1>Welcome, {`${user.name.first_name} ${user.name.last_name}`}</h1>
                        : <h1>Welocome, Please <NavLink to='/login'>LOG IN</NavLink> to started Shopping</h1>
                }
                <button onClick={/*</div>handleLogged*/() => handleLogged('/products')}> Get Started </button>
            </div>
        </div>
    )
}

export default Main