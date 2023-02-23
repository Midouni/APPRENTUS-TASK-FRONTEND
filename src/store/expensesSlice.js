import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenses, getExpense, createExpense, removeExpense, editExpense, editStatus } from '../api/api'
const currentDate = new Date()
const initialState = {
    expensesData: [],
    isLoading: true,
    expenseName: '0',
    expenseDesc: '',
    expenseDate: {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    },
    amount: '',
    isEditing: false,
    expenseEditingId: null,
    sort: "date"
}

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        clearForm: (state, action) => {
            state.expenseName = '';
            state.amount = '';
            state.expenseDate.day = currentDate.getDate();
            state.expenseDate.month = currentDate.getMonth() + 1;
            state.expenseDate.year = currentDate.getFullYear();
            state.expenseDesc = "";
            state.isEditing = false;
            state.expenseEditingId = null
        },
        handleChange: (state, action) => {
            const { name, value } = action.payload;
            if (name === 'day' || name === 'month' || name === 'year') {
                state.expenseDate[name] = value
            } else {
                state[name] = value
            }
        },
        handleEdit: (state, action) => {
            const id = action.payload.id

            //here get expense
            const expense = state.expensesData.filter((item) => { return item._id === id })[0]
            const date = expense.date.split("-")

            state.expenseName = expense.name;
            state.amount = expense.amount;
            state.expenseDate.day = date[2];
            state.expenseDate.month = date[1];
            state.expenseDate.year = date[0];
            state.expenseDesc = expense.desc
            state.isEditing = true
            state.expenseEditingId = id
        },
        handleSortType: (state, action) => {
            state.sort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllExpenses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                //console.log(action)
                state.isLoading = false;
                state.expensesData = action.payload;
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                //console.log(action);
                state.isLoading = false;
            })
            .addCase(getExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)

            })
            .addCase(getExpense.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(removeExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeExpense.fulfilled, (state, action) => {
                state.expensesData = action.payload
                state.isLoading = false;

            })
            .addCase(removeExpense.rejected, (state, action) => {
                //console.log(action);
                state.isLoading = false;
            })
            .addCase(editExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editExpense.fulfilled, (state, action) => {
                state.expensesData = action.payload
                state.expenseName = '';
                state.amount = '';
                state.expenseDate.day = currentDate.getDate();
                state.expenseDate.month = currentDate.getMonth() + 1;
                state.expenseDate.year = currentDate.getFullYear();
                state.expenseDesc = ""
                state.isLoading = false;
                state.isEditing = false;
                state.expenseEditingId = null
            })
            .addCase(editExpense.rejected, (state, action) => {
                //console.log(action);
                state.isLoading = false;
            })
            .addCase(editStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editStatus.fulfilled, (state, action) => {
                state.expensesData = action.payload
                state.isLoading = false
            })
            .addCase(editStatus.rejected, (state) => {
                //console.log(action);
                state.isLoading = false;
            })
            .addCase(createExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.expensesData = action.payload
                state.expenseName = '';
                state.amount = '';
                state.expenseDate.day = currentDate.getDate();
                state.expenseDate.month = currentDate.getMonth() + 1;
                state.expenseDate.year = currentDate.getFullYear();
                state.expenseDesc = ""
                state.isLoading = false;
            })
            .addCase(createExpense.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const {
    handleChange,
    handleEdit,
    clearForm,
    handleSortType
} = expensesSlice.actions;

export default expensesSlice.reducer;