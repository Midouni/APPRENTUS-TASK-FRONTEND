import React from 'react'
import style from './counter.module.css'
import ScatterPlotSharpIcon from '@mui/icons-material/ScatterPlotSharp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useSelector } from 'react-redux';


function Counter() {
    const state = useSelector((state) => state.dashboard)
    return (
        <section className={`${style.counter}`}>
            <div className={`${style.counterItem} sectionStructure`}>
                <ScatterPlotSharpIcon />
                <p>{state.allExpAmount}€ / {state.allExp}</p>
                <p>all expenses</p>
            </div>
            <div className={`${style.counterItem} sectionStructure`}>
                <CheckCircleOutlineIcon />
                <p>{state.approvedExpAmount}€ / {state.approvedExp}</p>
                <p>approved expenses</p>
            </div>
            <div className={`${style.counterItem} sectionStructure`}>
                <RemoveRedEyeIcon />
                <p>{state.underReviewExpAmount}€ / {state.underReviewExp}</p>
                <p>Expenses under review</p>
            </div>
            <div className={`${style.counterItem} sectionStructure`}>
                <ThumbDownOffAltIcon />
                <p>{state.rejectedExpAmount}€ / {state.rejectedExp}</p>
                <p>Rejected expenses</p>
            </div>
        </section>
    )
}

export default Counter