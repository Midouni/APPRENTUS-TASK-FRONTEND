import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL } from './endpoints'

// get all expenses 
const getAllExpenses = createAsyncThunk(
    'expenses/getAllExpenses',
    async (params, thunkAPI) => {
        try {
            if (params === undefined) {
                const resp = await axios.get(`${BASE_URL}/expenses`);
                return resp.data;
            }
            const resp = await axios.get(`${BASE_URL}/expenses?${params}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

//get one expenses with id 
const getExpense = createAsyncThunk(
    'expenses/getExpense',
    async (id, thunkAPI) => {
        try {
            const resp = await axios.get(`${BASE_URL}/expenses/${id}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

//create expenses
const createExpense = createAsyncThunk(
    'expense/createExpense',
    async (_, thunkAPI) => {
        try {
            //get state
            const { expenses } = thunkAPI.getState()
            const data = { "name": expenses.expenseName, "desc": expenses.expenseDesc, "date": expenses.expenseDate, "amount": expenses.amount }
            const sort = expenses.sort
            const resp = await axios.post(`${BASE_URL}/expenses?sort=${sort}`, data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

//remove expenses with id
const removeExpense = createAsyncThunk(
    'expense/removeExpense',
    async (id, thunkAPI) => {
        try {
            const { expenses } = thunkAPI.getState()
            const sort = expenses.sort
            const resp = await axios.delete(`${BASE_URL}/expenses/${id}?sort=${sort}`);
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

//edit expenses with id
const editExpense = createAsyncThunk(
    'expense/editExpense',
    async (_, thunkAPI) => {
        try {
            //get state
            const { expenses } = thunkAPI.getState()

            const sort = expenses.sort
            const id = expenses.expenseEditingId
            const data = { "name": expenses.expenseName, "desc": expenses.expenseDesc, "date": expenses.expenseDate, "amount": expenses.amount }
            const resp = await axios.patch(`${BASE_URL}/expenses/${id}?sort=${sort}`, data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

//use same end point with edit but with diffirent parameters
const editStatus = createAsyncThunk(
    'expense/editStatus',
    async ({ id, value }, thunkAPI) => {
        try {
            const { expenses } = thunkAPI.getState()
            const sort = expenses.sort
            const resp = await axios.patch(`${BASE_URL}/expenses/${id}?sort=${sort}`, { "status": value })
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

//get all data that showing in dashboard || calculate all data from sum of amout for each status on server side
const fetchDashboardData = createAsyncThunk(
    'dashboard/fetechData',
    async (params, thunkAPI) => {
        try {
            const { dashboard } = thunkAPI.getState()
            const { startDate, endDate, sort } = dashboard
            let sortParam = params || sort
            if (startDate !== '' && endDate !== '') {
                const resp = await axios.get(`${BASE_URL}/dashboard?sort=${sortParam}&startDate=${startDate}&endDate=${endDate}`)
                return resp.data
            } else {
                const resp = await axios.get(`${BASE_URL}/dashboard?sort=${sort}`)
                return resp.data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

export {
    getAllExpenses,
    getExpense,
    createExpense,
    removeExpense,
    editExpense,
    editStatus,
    fetchDashboardData
}