import React, { useState, useParams } from 'react'
import styles from './Navbar.module.css'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil'
import { createHtmlDataState } from '../globalstate/atom';
import logo from '../static/peng1.png';

function Navbar(props) {

    // if(!props.isLoggedIn){
    //     hist.push('/');
    // }
    // hist.push('/');
    const handleLogout = () =>{
        console.log(props);
        localStorage.removeItem('user');
        props.setIsLoggedIn(false);
        props.setUser(null);
    }

    const [loggedIn, setLoggedIn] = useState(false)
    const [htmlData, setHtmlData] = useRecoilState(createHtmlDataState)
    return (
        <div className={styles.navbar}>
            {/* <Link to={{pathname:"https://www.kernel.org/doc/man-pages/"}}>
                <p>Official</p>
            </Link> */}

            {/* <a href="https://www.kernel.org/doc/man-pages/" target="_blank">Official</a> */}
            <Link to="/about">
                <p>About</p>
            </Link>
            <Link to="/favorites">
                <p>Favorites</p>
            </Link>
            <Link to="/feedback">
                <p>Tty</p>
            </Link>
            <Link to="/" style={{float:"right"}}><p><img style={{width:"50px", margin:"auto auto"}}id="peng" src={logo}></img></p></Link>
            {props.isLoggedIn ? <Link onClick={handleLogout} style={{float:"right"}} to="/">
                <p>Logout</p>
            </Link> : null}

            {props.isLoggedIn ? null : <Link style={{float:"right"}} to="/login">
                <p>Login</p>
            </Link>}
            <Link style={{float:"right"}} to="/signup">
                <p>Signup</p>
            </Link>
            
        </div>
    )
}

export default Navbar;
