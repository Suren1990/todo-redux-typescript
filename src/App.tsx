import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import Tabs from "./components/Tabs/Tabs";
import useInterval from "use-interval";

import "./App.css";
import { overdueTodoAction } from "./features/todoSlice";

function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const tabList = ["Pending", "Completed", "Overdue", "Trash"];

  const [activeTab, setActiveTab] = useState("Pending");

  useInterval(() => {
    const currentTime = Date.now();

    todos.forEach((todo) => {
      if (currentTime >= new Date(todo.expiredDate).getTime()) {
        dispatch(overdueTodoAction(todo.id));
      }
    });
  }, 5_000);

  return (
    <div className="todo">
      <h1 className="todo__main_title">Todo List</h1>
      <AddTodo />
      <Tabs
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TodoList activeTab={activeTab} />
    </div>
  );
}

export default App;
