import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <div className="nav">
            <div className="head">
                Authentication
            </div>
            <div className="list">
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/signin">Signin</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
