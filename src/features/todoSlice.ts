import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../models/ITodo";

interface TodosState {
    todos: ITodo[];
}

const initialState: TodosState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodoAction(state, action: PayloadAction<ITodo>) {
            state.todos.push({
                id: String(Math.random()),
                title: action.payload.title,
                description: action.payload.description,
                expiredDate: action.payload.expiredDate,
                isCompleted: false,
            })
        },
        completeTodoAction(state, action: PayloadAction<ITodo>) {
            const completedTodo = state.todos.find((todo) => todo.id === action.payload.id);
            if (completedTodo) {
                completedTodo.isCompleted = !completedTodo.isCompleted;
            }
        },
        deleteTodoAction(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        deleteAllCompletedAction(state) {
            state.todos = state.todos.filter((todo) => !todo.isCompleted)
        },
    }
})

export const { addTodoAction, completeTodoAction, deleteTodoAction, deleteAllCompletedAction } = todoSlice.actions;

export default todoSlice.reducer;
