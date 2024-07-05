import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import calculatorReducer from "./slices/calculator";

export default configureStore({
    reducer: {
        counter: counterReducer,
        calculator: calculatorReducer
    }
});