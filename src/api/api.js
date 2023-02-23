import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL } from './endpoints'


const getAllExpenses = createAsyncThunk(
    'expenses/getAllExpenses',
    async (params, thunkAPI) => {
        try {
            if (params === undefined) {
                const resp = await axios.get(`${BASE_URL}/expenses`);
                return resp.data;
            }
            const resp = await axios.get(`/expenses?${params}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);


const getExpense = createAsyncThunk(
    'expenses/getExpense',
    async (id, thunkAPI) => {
        try {
            const resp = await axios.get(`/expenses/${id}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)


const createExpense = createAsyncThunk(
    'expense/createExpense',
    async (_, thunkAPI) => {
        try {
            //get state
            const { expenses } = thunkAPI.getState()
            let date = `${expenses["expenseDate"]['year']}-${expenses["expenseDate"]['month']}-${expenses["expenseDate"]['day']}`
            const data = { "name": expenses.expenseName, "desc": expenses.expenseDesc, "date": date, "amount": expenses.amount }
            const sort = expenses.sort
            const resp = await axios.post(`/expenses?sort=${sort}`, data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

const removeExpense = createAsyncThunk(
    'expense/removeExpense',
    async (id, thunkAPI) => {
        try {
            const { expenses } = thunkAPI.getState()
            const sort = expenses.sort
            const resp = await axios.delete(`/expenses/${id}?sort=${sort}`);
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

const editExpense = createAsyncThunk(
    'expense/editExpense',
    async (_, thunkAPI) => {
        try {
            //get state
            const { expenses } = thunkAPI.getState()

            const sort = expenses.sort
            const id = expenses.expenseEditingId
            let date = `${expenses["expenseDate"]['year']}-${expenses["expenseDate"]['month']}-${expenses["expenseDate"]['day']}`
            const data = { "name": expenses.expenseName, "desc": expenses.expenseDesc, "date": date, "amount": expenses.amount }
            const resp = await axios.patch(`/expenses/${id}?sort=${sort}`, data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

const editStatus = createAsyncThunk(
    'expense/editStatus',
    async ({ id, value }, thunkAPI) => {
        try {
            const { expenses } = thunkAPI.getState()
            const sort = expenses.sort
            const resp = await axios.patch(`/expenses/${id}?sort=${sort}`, { "status": value })
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('somthing went wrong')
        }
    }
)

const fetchDashboardData = createAsyncThunk(
    'dashboard/fetechData',
    async (params, thunkAPI) => {
        try {
            const { dashboard } = thunkAPI.getState()
            const { startDate, endDate, sort } = dashboard
            let sortParam = params || sort
            if (startDate !== '' && endDate !== '') {
                const resp = await axios.get(`/dashboard?sort=${sortParam}&startDate=${startDate}&endDate=${endDate}`)
                return resp.data
            } else {
                const resp = await axios.get(`/dashboard?sort=${sort}`)
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