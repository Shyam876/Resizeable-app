import { createSlice } from "@reduxjs/toolkit";

export const empSlice = createSlice({
    name : "employee",
    initialState : {
        value : [],
        addCount : 0,
        updateCount : 0,
    },
    reducers : {
        addUser : (state,action) =>{
            state.value = action.payload
        },
        incrementAddCount : (state) => {
            state.addCount += 1
        },
        incrementUpdateCount : (state) => {
            state.updateCount += 1
        }
    }
});

export default empSlice.reducer;
export const{addUser, incrementAddCount, incrementUpdateCount} = empSlice.actions;