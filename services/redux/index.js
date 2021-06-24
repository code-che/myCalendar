import {combineReducers} from "redux";
import events from "./events";
import googleApi from "./googleApi";
import modal from "./modal";

export default combineReducers({
    events,
    googleApi,
    modal,
})