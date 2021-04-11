import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import mentormessages from './mentormessages'
import studentMessages from './studentMessage'

export default combineReducers({
  auth,
  message,
  mentormessages,
  studentMessages,
  
});
