import { combineReducers} from "redux";
import loginReducer from "./login";

const allReducers= combineReducers({
    loginReducer,

    //Them reducer o day
})

export default allReducers;