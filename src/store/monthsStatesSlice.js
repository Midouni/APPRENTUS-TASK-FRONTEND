import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    approvedData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    underReviewData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rejectedData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    isLoading: false
};

const monthsStatesSlice = createSlice({
    name: "monthsStatesSlice",
    initialState,
    reducers: {
        handleLoading: (state, action) => {
            state.isLoading = true;
        },
        handleData: (state, action) => {
            state.approvedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            state.underReviewData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            state.rejectedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            action.payload.data.forEach((item) => {
                let dates = item.date.split('-');
                if (parseInt(dates[0]) === parseInt(action.payload.year)) {
                    if (parseInt(item.status) === 1) {
                        state.approvedData[parseInt(dates[1]) - 1] += 1;
                    } else if (parseInt(item.status) === 0) {
                        state.underReviewData[parseInt(dates[1]) - 1] += 1;
                    } else {
                        state.rejectedData[parseInt(dates[1]) - 1] += 1;
                    }
                }
            });

            state.isLoading = false;
        }
    }
});

export const { handleLoading, handleData } = monthsStatesSlice.actions;
export default monthsStatesSlice.reducer;
