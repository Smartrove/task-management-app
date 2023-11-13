import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  task: []
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
   getAllTasks: (state, {payload}) =>{

    console.log("task payload", payload)

    state.task = payload

   },
   createTask: (state, {payload}) =>{
    
   }
   
  },
});

export const { getAllTasks } = taskSlice.actions;

export default taskSlice.reducer;


