import { createSlice } from "@reduxjs/toolkit"
import { fetchDashboardData } from "../api/api"

const initialState = {
    expensesArray: [],
    startDate: "",
    endDate: "",
    sort: "date",
    isLoading: false,

    allExpAmount: 0,
    allExp: 0,
    approvedExpAmount: 0,
    approvedExp: 0,
    underReviewExpAmount: 0,
    underReviewExp: 0,
    rejectedExpAmount: 0,
    rejectedExp: 0
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        handleDate: (state, action) => {
            const { onChangeStartDate, onChangeEndDate } = action.payload
            if (onChangeStartDate !== '' && onChangeEndDate !== '') {
                state.startDate = onChangeStartDate
                state.endDate = onChangeEndDate
            }
        },
        handleSortTypeDashboard: (state, action) => {
            state.sort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.expensesArray = action.payload.data
                state.allExpAmount = action.payload.allExpAmount
                state.allExp = action.payload.allExp
                state.approvedExpAmount = action.payload.approvedExpAmount
                state.approvedExp = action.payload.approvedExp
                state.underReviewExpAmount = action.payload.underReviewExpAmount
                state.underReviewExp = action.payload.underReviewExp
                state.rejectedExpAmount = action.payload.rejectedExpAmount
                state.rejectedExp = action.payload.rejectedExp
                state.isLoading = false
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { handleDate, handleSortTypeDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer