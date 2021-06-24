import {combineReducers} from "redux";
import events from "./events";
import googleApi from "./googleApi";

export default combineReducers({
    events,
    googleApi,
})