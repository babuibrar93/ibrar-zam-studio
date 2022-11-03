import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

import rootReducer from "../Reducer/Root-Reducer/Root-Reducer";

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
  // applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default { store, persistor };
