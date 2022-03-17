import React from 'react'
import '../../css/Header/Header.css'
import { words } from '../../words'

const Header = () => {
    return (
        <header>
            <div className='container'>
                {words.headerTitle}
            </div>
        </header>
    )
}

export default Header