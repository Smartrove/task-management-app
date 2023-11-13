import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import taskReducer from './features/tasks/taskSlice'
import { crudApi } from "./api/apiSlice";



const store = configureStore({
  reducer: {
    [crudApi.reducerPath]: crudApi.reducer,
    auth: authReducer,
    task: taskReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crudApi.middleware),
  devTools: process.env.VITE_APP_NODE_ENV as string !== "production",
});


export type RootState = ReturnType<typeof store.getState>

export default store;
