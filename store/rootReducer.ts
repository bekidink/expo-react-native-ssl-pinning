import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import logoutReducer from "../features/modal/logoutSlice";

import dataReducer from "../features/data/dataSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  logout: logoutReducer,
  
  data: dataReducer,
  auth: authReducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
