import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Progress } from './../index'
import style from './layout.module.css'
import { useSelector } from 'react-redux'




function Layout() {
    const state = useSelector((state) => state)
    return (
        <div className={style.container}>
            {state.expenses.isLoading && <Progress />}
            {state.dashboard.isLoading && <Progress />}
            {state.monthsStates.isLoading && <Progress />}
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout