import { useAppDispatch } from "../../app/hooks";
import { ITodo } from "../../models/ITodo";
import { completeTodoAction, deleteTodoAction } from "../../features/todoSlice";

import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: ITodo;
  activeTab: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  activeTab
}) => {
  const dispatch = useAppDispatch();

  const onChange = () => {
    dispatch(completeTodoAction(todo));
  };

  const deleteTodo = (id: string) => {
    dispatch(deleteTodoAction(id));
  }

  return (
    <div className={styles.todoitem}>
      <div className={styles.todoitem__top}>
        <input
          className={styles.todoitem__checkbox}
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onChange}
        />
        <h4
          className={`${styles.todoitem__title} ${
            todo.isCompleted ? styles.todoitem__title_completed : ""
          }`}
        >
          {todo.title}
        </h4>
      </div>
      <p className={styles.todoitem__description}>{todo.description}</p>
      <p className={styles.todoitem__expireddate}>
        <span>Expired: </span> 
        {todo.expiredDate}
      </p>
      {activeTab === "completed" && (
        <button
          className={styles.todoitem__delete}
          onClick={() => deleteTodo(todo.id)}
        >
          &#128465;
        </button>
      )}
    </div>
  );
};

export default TodoItem;
