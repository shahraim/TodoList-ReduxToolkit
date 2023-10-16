import { createSlice } from "@reduxjs/toolkit";

const storedTodoData = JSON.parse(localStorage.getItem("todoData")) || [];

const todoSlice = createSlice({
  name: "todo",
  initialState: storedTodoData,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        status: action.payload.status,
        time: Date.now(),
      };
      state.push(newTodo);
      localStorage.setItem("todoData", JSON.stringify(state));
    },
    removeTodo: (state, action) => {
      const idToRemove = action.payload.id;
      const remove = state.filter((todo) => todo.id !== idToRemove);
      localStorage.setItem("todoData", JSON.stringify(remove));
      return remove;
    },
    editTodo: (state, action) => {
      const { id, title, status } = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      state[index] = action.payload;
      localStorage.setItem("todoData", JSON.stringify(state));
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
