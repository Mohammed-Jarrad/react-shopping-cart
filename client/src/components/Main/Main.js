import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/Main/Main.css'
import { CurrentUserContext } from '../App/App'

const Main = () => {

    async function handleClick() {
        try {
            const res = await fetch('/products', { method: "GET" })
            res.status === 400 && window.location.assign('/login')
        } catch (e) {
            console.log(e)
        }
    }

    let currentUser = useContext(CurrentUserContext);

    return (
        <div className='main-page'>
            <div className='content'>
                {
                    typeof currentUser === "object"
                        ? <h1>Welcome, {`${currentUser.name.first_name} ${currentUser.name.last_name}`}</h1>
                        : <h1><NavLink to='/login'>LOG IN</NavLink> to started Shopping</h1>
                }
                <button onClick={handleClick}> Get Started </button>
                {
                    typeof currentUser === 'object' && <button>{currentUser.name.last_name} INFO</button>
                }
            </div>
        </div>
    )
}

export default Main