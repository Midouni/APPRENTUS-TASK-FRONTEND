import React, { useState } from 'react'
import style from './expense.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useDispatch } from 'react-redux';
import { handleEdit } from '../../../store/expensesSlice';
import { removeExpense, editStatus } from '../../../api/api'



function Expense({ expense }) {

    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()

    const editClickHandler = () => {
        window.history.pushState(null, "", '/expenses');
        window.location.href = "#newExpenseSection"
        dispatch(handleEdit({ id: expense._id }))
    }
    return (
        <section className={style.expense}>
            <div>{expense.name}</div>
            <div>{expense.desc}</div>
            <div>{expense.date}</div>
            <div>{expense.amount}€</div>
            <div>
                <select onChange={(e) => { dispatch(editStatus({ id: expense._id, value: e.target.value })) }} value={expense.status} className={style.status}>
                    <option value="1">Approved</option>
                    <option value="0">Under Review</option>
                    <option value="-1">Rejected</option>
                </select>
            </div>
            <div className={style.edit}>
                <ClickAwayListener onClickAway={() => { setShowMenu(false) }}>
                    <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => { setShowMenu(true) }} />
                </ClickAwayListener>
                <div style={{ display: `${showMenu ? 'block' : "none"}` }} className={style.editShow} >
                    <div className={style.editContent} >
                        <div className={style.editExpense} onClick={editClickHandler}>
                            <EditIcon sx={{ fontSize: "20px", marginRight: '7px' }} />
                            <span>Edit</span>
                        </div>
                        <div className={style.deleteExpense} onClick={(e) => {
                            dispatch(removeExpense(expense._id))
                        }}>
                            <DeleteIcon sx={{ fontSize: "20px", marginRight: '7px' }} />
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Expense