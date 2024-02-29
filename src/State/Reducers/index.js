import {combineReducers} from "redux";
import ModeReducer, { DialogStatus } from "./ModeReducer";
import { Curr_Page } from "./ModeReducer";


const reducers=combineReducers(
    {
        mode:ModeReducer,
        page:Curr_Page
    }
)
export default reducers;