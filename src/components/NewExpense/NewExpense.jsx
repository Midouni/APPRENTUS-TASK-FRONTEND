import React from 'react'
import style from "./newexpense.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearForm } from '../../store/expensesSlice';
import { editExpense, createExpense } from '../../api/api';
import TextField from '@mui/material/TextField';
import { data } from './data'


function NewExpense() {
    const employees = data
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
        <div className={`${style.newExpense} sectionStructure`}>
            <div className={style.content}>
                <div className={style.imgDiv}>
                    <img src="./assets/imgForAddExpense.png" alt="img For Add Expense" />
                </div>
                <div className={style.divForm}>
                    <form className={style.form} onSubmit={onSubmitHandler}>
                        <div>
                            <select value={state.expenseName} className={style.name} name="expenseName" required onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}>
                                <option hidden value="0">Please Choose Name </option>
                                {employees.map((employe) => {
                                    return (
                                        <option key={employe.id} value={employe.name}>{employe.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <textarea className={style.description} name="expenseDesc" placeholder='description' required
                                onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }} value={state.expenseDesc}
                            ></textarea>
                        </div>
                        <div className={style.date}>
                            <TextField
                                label="Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="expenseDate"
                                value={state.expenseDate}
                                onChange={(e) => { dispatch(handleChange({ name: e.target.name, value: e.target.value })) }}
                                required
                            />

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