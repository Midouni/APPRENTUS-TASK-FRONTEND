import React from 'react'
import style from './sorttable.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { handleSortType } from '../../../store/expensesSlice';
import { handleSortTypeDashboard } from '../../../store/dashboardSlice';
import { getAllExpenses, fetchDashboardData } from '../../../api/api'
import { useLocation } from "react-router-dom"

function SortTable() {
    const state = useSelector((state) => state)

    const dispatch = useDispatch()

    const { pathname } = useLocation();
    const handleSort = (e) => {

        if (pathname === "/expenses") {
            let sort = `sort=${e.target.value}`
            dispatch(handleSortType(e.target.value))
            dispatch(getAllExpenses(sort))
        }
        if (pathname === "/") {
            dispatch(handleSortTypeDashboard(e.target.value))
            dispatch(fetchDashboardData(e.target.value))
        }
    }
    return (
        <>
            <section className={style.sortExpenses}>
                <div className={style.searchExpenses}>
                    <SearchIcon />
                    <input type="text" placeholder='search by name' />
                </div>
                <div className={style.filterExpenses}>
                    <span>sorted by </span>
                    <select defaultValue={pathname === "/" ? state.dashboard.sort : state.expenses.sort} onChange={handleSort}>
                        <option value='date'>date</option>
                        <option value='status'>status</option>
                        <option value='amount'>amount</option>
                        <option value='name'>name</option>
                    </select>
                </div>
            </section>
        </>
    )
}

export default SortTable