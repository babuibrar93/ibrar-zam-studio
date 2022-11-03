import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { auth } from "../auth.reducer";

// Redux persist configiration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  // Add reducers here
  auth,
});

export default persistReducer(persistConfig, rootReducer);
