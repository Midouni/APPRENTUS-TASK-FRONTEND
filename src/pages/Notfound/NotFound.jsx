import React from 'react'
import { Link } from 'react-router-dom'
import style from './notfound.module.css'

function NotFound() {
    return (
        <div className={style.notFound}>
            <h3>NOT FOUND</h3>
            <Link to='/expenses'>
                <button className='sectionStructure'>Home</button>
            </Link>
        </div>
    )
}

export default NotFound