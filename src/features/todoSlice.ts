import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditTodo, ITodo } from "../models/ITodo";

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
                isRemoved: false,
                isOverdue: false,
            })
        },
        completeTodoAction(state, action: PayloadAction<ITodo>) {
            const completedTodo = state.todos.find((todo) => todo.id === action.payload.id);
            if (completedTodo) {
                completedTodo.isCompleted = !completedTodo.isCompleted;
            }
        },
        editTodoAction(state, action: PayloadAction<EditTodo>) {
            const editedTodo = state.todos.find((todo) => todo.id === action.payload.id);
            if (editedTodo) {
                editedTodo.title = action.payload.title;
                editedTodo.description = action.payload.description;
                editedTodo.expiredDate = action.payload.expiredDate;
            }
        },
        movoTodosToTrashAction(state, action: PayloadAction<ITodo["id"]>) {
            const movedTodoToTrash = state.todos.find((todo) => todo.id === action.payload);
            if (movedTodoToTrash) {
                movedTodoToTrash.isRemoved = true;
            }
        },
        overdueTodoAction(state, action: PayloadAction<ITodo["id"]>) {
            const todoOverdue = state.todos.find((todo) => todo.id === action.payload);
            if (todoOverdue) {
                todoOverdue.isOverdue = true;
            }
        },
        deleteTodoAction(state, action: PayloadAction<ITodo["id"]>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        deleteAllCompletedAction(state) {
            state.todos = state.todos.filter((todo) => !todo.isRemoved)
        },
    }
})

export const { addTodoAction, completeTodoAction, editTodoAction, deleteTodoAction, movoTodosToTrashAction, overdueTodoAction, deleteAllCompletedAction } = todoSlice.actions;

export default todoSlice.reducer;
