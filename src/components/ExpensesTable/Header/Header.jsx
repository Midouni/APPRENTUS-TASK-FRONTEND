import React from 'react'
import style from './header.module.css'

function Header() {
    return (
        <>
            <section className={style.headerTable}>
                <div>Name</div>
                <div>description</div>
                <div>date</div>
                <div>amount</div>
                <div>status</div>
                <div></div>
            </section>
        </>
    )
}

export default Header