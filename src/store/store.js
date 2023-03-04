import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./expensesSlice"
import dashboardSlice from './dashboardSlice';
import monthsStatesSlice from './monthsStatesSlice';


export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        dashboard: dashboardSlice,
        monthsStates: monthsStatesSlice
    },
})