import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Expenses, NotFound } from './pages'
import { Layout } from './components'

import { useDispatch } from "react-redux";
import { getAllExpenses, fetchDashboardData } from "./api/api";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllExpenses())
        dispatch(fetchDashboardData())
    })
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router >
    )
}

export default App