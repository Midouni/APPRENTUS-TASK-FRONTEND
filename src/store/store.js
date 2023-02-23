import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./expensesSlice"
import dashboardSlice from './dashboardSlice';


export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        dashboard: dashboardSlice
    },
})