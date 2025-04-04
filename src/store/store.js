import { configureStore } from "@reduxjs/toolkit";
import activeSlices from "./activeSlices";

const store = configureStore({
    reducer:{
        active:activeSlices
    }
})

export default store;