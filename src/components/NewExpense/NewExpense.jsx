import React from 'react'
import style from "./newexpense.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearForm } from '../../store/expensesSlice';
import { editExpense, createExpense } from '../../api/api';


function NewExpense() {
    const currentDate = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const { isEditing } = useSelector((state) => state.expenses)

    const state = useSelector((state => state.expenses))
    const dispatch = useDispatch()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(createExpense())
    }
    const onSubmitEditedHandler = (e) => {
        e.preventDefault()
        dispatch(editExpense())
    }

    const clearFormHandler = (e) => {
        e.preventDefault()
        dispatch(clearForm())
    }


    return (
        <div className={style.newExpense}>
            <div className={style.content}>
                <div className={style.imgDiv}>
                    <img src="./assets/imgForAddExpense.png" alt="img For Add Expense" />
                </div>
                <div className={style.divForm}>
                    <form className={style.form} onSubmit={onSubmitHandler}>
                        <div>
                            <select value={state.expenseName} className={style.name} name="expenseName" required onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}>
                                <option hidden value="0">Please Choose Name </option>
                                <option value="mohamed midouni">mohamed midouni</option>
                                <option value="ahmed midouni">ahmed midouni</option>
                                <option value="ayoub midouni">ayoub midouni</option>
                                <option value="anwer midouni">anwer midouni</option>
                            </select>
                        </div>
                        <div>
                            <textarea className={style.description} name="expenseDesc" placeholder='description' required
                                onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }} value={state.expenseDesc}
                            ></textarea>
                        </div>
                        <div className={style.date}>
                            <select value={state.expenseDate.month} name="month" required onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}>
                                {[...Array(12).keys()].map((month) => {
                                    return (<option key={month} value={month + 1}>{months[month]}</option>);
                                })}
                            </select>
                            <select value={state.expenseDate.day} name="day" required onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}>
                                {[...Array(31).keys()].map((day) => {
                                    return (<option key={day} value={day + 1}>{day + 1}</option>)
                                })}
                            </select>
                            <select value={state.expenseDate.year} name="year" required onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}>
                                {[...Array(10).keys()].map((year) => {
                                    return (<option key={year} value={currentDate.getFullYear() + 5 - year}>{currentDate.getFullYear() + 5 - year - 1}</option>)
                                })}
                            </select>
                        </div>
                        <div>
                            <input required value={state.amount} min='1' className={style.amount} type="text" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" placeholder='Amount €' name="amount"
                                onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }} />
                        </div>
                        <div>
                            {isEditing ?
                                <>
                                    <button onClick={(e) => { onSubmitEditedHandler(e) }} className={style.addButton}>Edit</button>
                                    <button onClick={(e) => { clearFormHandler(e) }} className={style.addButton}>Cancel</button>
                                </> :
                                <button type='submit' className={style.addButton}>ADD</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewExpense