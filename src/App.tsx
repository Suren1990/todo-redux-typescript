import { useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import Tabs from "./components/Tabs/Tabs";

import "./App.css";

function App() {
  const tabList = ["Pending", "Completed", "Overdue", "Removed / Trash"];

  const [activeTab, setActiveTab] = useState("Pending");

  return (
    <div className="todo">
      <h1 className="todo__main_title">Todo List</h1>
      <AddTodo />
      <Tabs
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TodoList
        activeTab={activeTab}
      />
    </div>
  );
}

export default App;
