import React, { useState } from 'react'
import style from './date.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux';
import { handleDate } from '../../../store/dashboardSlice'

function Date() {
    const [onChangeStartDate, setOnChangeStartDate] = useState()
    const [onChangeEndDate, setOnChangeEndDate] = useState()
    const dispatch = useDispatch()
    const { startDate, endDate } = useSelector((state) => state.dashboard)

    const handleChangeDate = (e) => {
        dispatch(handleDate({ onChangeStartDate, onChangeEndDate }))
    }

    return (
        <section className={`${style.date} sectionStructure`}>
            <div className={style.title}>
                <p>Choose the date range: </p>
            </div>
            <div className={style.dateConatiner}>
                <div>
                    <TextField
                        className={style.textField}
                        id="date"
                        label="From"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="startDate"
                        defaultValue={startDate}
                        onChange={(e) => { setOnChangeStartDate(e.target.value) }}
                    />
                </div>
                <div>
                    <TextField
                        className={style.textField}
                        id="date"
                        label="To"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={endDate}
                        onChange={(e) => { setOnChangeEndDate(e.target.value) }}
                    />
                </div>
                <div>
                    <Button variant="contained"
                        onClick={handleChangeDate}
                    >Submit</Button>
                </div>
            </div>
        </section>
    )
}

export default Date