import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        status: action.payload.status,
        time: Date.now(),
      };
      state.push(newTodo);
    },
    removeTodo: (state, action) => {
      const idToRemove = action.payload.id;
      return state.filter((todo) => todo.id !== idToRemove);
    },
    editTodo: (state, action) => {
      const { id, title, status } = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      state[index] = action.payload;
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
