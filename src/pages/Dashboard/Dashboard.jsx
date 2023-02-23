import React, { useEffect } from "react";
import { Container } from '@mui/system';
import style from './dashboard.module.css'
import Date from "./Date/Date";
import Counter from "./Counter/Counter";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../api/api";



const Dashboard = () => {
    const { expensesArray, startDate } = useSelector((state) => state.dashboard)
    const { expensesData } = useSelector((state) => state.expenses)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDashboardData())
    }, [expensesData, dispatch, startDate])
    return (
        <div className={style.dashboard}>
            <Container sx={{ marginTop: "100px" }}>
                <section>
                    <Date />
                </section>
                <section>
                    <Counter />
                </section>
                <section>
                    <ExpensesTable data={expensesArray} />
                </section>

            </Container>

        </div>
    )
}

export default Dashboard