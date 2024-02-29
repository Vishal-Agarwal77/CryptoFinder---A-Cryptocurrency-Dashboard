import {thunk} from "redux-thunk";
import reducers from "./Reducers";
import {configureStore} from "@reduxjs/toolkit";

export const store=configureStore(
    {
        reducer:reducers
    }
)