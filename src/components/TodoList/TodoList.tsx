import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteAllCompletedAction } from "../../features/todoSlice";
import TodoItem from "../TodoItem/TodoItem";

import styles from "./TodoList.module.scss";

interface TodoListProps {
  activeTab: string;
}

const TodoList: React.FC<TodoListProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  let todosByTab = todos;

  if (activeTab === "Trash") {
    todosByTab = todos.filter((todo) => todo.isRemoved);
  }

  if (activeTab === "Completed") {
    todosByTab = todos.filter((todo) => todo.isCompleted && !todo.isOverdue && !todo.isRemoved);
  }

  if (activeTab === "Pending") {
    todosByTab = todos.filter((todo) => !todo.isCompleted && !todo.isRemoved && !todo.isOverdue);
  }

  if (activeTab === "Overdue") {
    todosByTab = todos.filter((todo) => todo.isOverdue && !todo.isRemoved);
  }

  const deleteAllCompleted = () => {
    dispatch(deleteAllCompletedAction());
  };

  return (
    <div className={styles.todolist}>
      {!!todosByTab.length ? (
        <>
          <div className={styles.todolist__content}>
            {todosByTab.map((todo) => (
              <TodoItem todo={todo} activeTab={activeTab} key={todo.id} />
            ))}
          </div>
          {activeTab === "Trash" && (
            <button
              className={styles.todolist__btn_delete}
              onClick={deleteAllCompleted}
            >
              <span>&#128465;</span> delete all
            </button>
          )}
        </>
      ) : (
        <h2 className={styles.todolist__notodo}>
          No Items in the {activeTab}!
        </h2>
      )}
    </div>
  );
};

export default TodoList;
