import { createSlice } from "@reduxjs/toolkit";
import { evaluateExpression, isDigit } from "../utils/calculator";

const calculatorSlice = createSlice({
    name: "calculator",
    initialState: {
        display: "0",
        value: 0,
    },
    reducers: {
        update: (state, action) => {
            const lastInput = state.display[state.display.length - 1];
            if ((!isDigit(action.payload) && action.payload === lastInput) || (!isDigit(action.payload) && !isDigit(lastInput)) || (state.display === "0" && !isDigit(action.payload))) {
                return;
            } else {
                if (state.display === "0") {
                    state.display = action.payload;
                } else if (action.payload === "AC") {
                    state.display = "0";
                } else if (action.payload === "X") {
                    state.display = state.display + "*";
                } else if (action.payload === "Backspace") {
                    if (state.display !== "0" && state.display.length >= 1) {
                        const value = state.display.substring(0, state.display.length - 1);
                        if (value === "") {
                            state.display = "0";
                        } else {
                            state.display = value;
                        }
                    }
                } else {
                    state.display = state.display + action.payload;
                }
                state.value = evaluateExpression(state.display);
            }
        },
        calculate: (state, action) => {
            if (action.payload !== "=") {
                return;
            }
            let displayString = state.display;

            if (displayString[displayString.length - 1] === "+" || displayString[displayString.length - 1] === "-") {
                displayString = displayString + "0";
            } else if (displayString[displayString.length - 1] === "*" || displayString[displayString.length - 1] === "/") {
                displayString = displayString + "1";
            }
            const answer = evaluateExpression(displayString);
            state.value = answer;
            state.display = `${answer}`;
        }
    }
});

export const { calculate, update } = calculatorSlice.actions;

export default calculatorSlice.reducer;