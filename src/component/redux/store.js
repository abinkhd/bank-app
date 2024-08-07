import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/bankReducer";

export const store = configureStore({ reducer: authReducer });
