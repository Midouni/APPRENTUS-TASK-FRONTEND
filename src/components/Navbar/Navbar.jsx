import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import style from './navbar.module.css'
import { Link } from 'react-router-dom'
import TableChartIcon from '@mui/icons-material/TableChart';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';






function Navbar() {
    const { pathname } = useLocation();
    const navRef = useRef(null)
    const menuRef = useRef(null)

    const clickHandler = (e) => {
        if (menuRef.current.contains(e.target) && window.innerWidth <= 1100) {
            navRef.current.style.left = '0px'
        } else if (window.innerWidth <= 1100 && navRef.current.style.left === '0px') {
            navRef.current.style.left = '-280px'
        }
    }
    useEffect(() => {
        window.addEventListener('click', clickHandler)
    }, [])

    return (
        <div style={{ postion: 'relative' }}>
            <div className={style.menu}>
                <MenuIcon ref={menuRef} sx={{ fontSize: '30px' }} />
            </div>
            <nav ref={navRef} className={style.navbar}>
                <div className={`${style.logo} `}>
                    <Link to='/'>
                        <img src="./assets/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className={style.list}>
                    <ul>
                        <li>
                            <Link to='/' className={pathname === '/' ? `${style.active}` : ""} >
                                <TableChartIcon />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/expenses' className={pathname === '/expenses' ? `${style.active}` : ""}>
                                <AddIcon />
                                <span>Expenses</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar