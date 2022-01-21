import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./createBlock/main";

const store = configureStore({
    reducer: counterSlice.reducer
})

export default store;