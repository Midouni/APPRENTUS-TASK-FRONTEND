import React from 'react'
import style from './progress.module.css'
import CircularProgress from '@mui/material/CircularProgress';

function Progress() {
    return (
        <div className={style.progress}>
            <CircularProgress />
        </div>
    )
}

export default Progress