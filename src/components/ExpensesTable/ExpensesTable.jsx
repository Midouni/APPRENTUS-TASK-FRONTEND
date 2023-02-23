import React from 'react';
import Expense from './Expense/Expense'
import Header from './Header/Header';
import SortTable from './SortTable/SortTable';

function ExpensesTable({ data }) {


    if (data.length === 0) {
        return <></>
    }
    return (
        <>
            <SortTable />
            <Header />
            {data.map((item) => {
                return <Expense key={item._id} expense={item} />
            })}
        </>
    )
}

export default ExpensesTable