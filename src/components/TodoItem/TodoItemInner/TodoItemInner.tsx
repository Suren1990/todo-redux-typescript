import { useAppDispatch } from "../../../app/hooks";
import {
  completeTodoAction,
  deleteTodoAction,
  movoTodosToTrashAction,
} from "../../../features/todoSlice";
import { ITodo } from "../../../models/ITodo";

import styles from "./TodoItemInner.module.scss";

interface TodoItemInnerProps {
  todo: ITodo;
  activeTab: string;
}

const TodoItemInner: React.FC<TodoItemInnerProps> = ({ todo, activeTab }) => {
  const dispatch = useAppDispatch();

  const onChange = () => {
    dispatch(completeTodoAction(todo));
  };

  const movoTodosToTrash = (id: string) => {
    dispatch(movoTodosToTrashAction(id));
  };

  const deleteTodo = (id: string) => {
    dispatch(deleteTodoAction(id));
  };

  return (
    <div className={styles.todoiteminner}>
      <div className={styles.todoiteminner__top}>
        {activeTab !== "Overdue" && (
          <input
            className={styles.todoitem__checkbox}
            type="checkbox"
            checked={todo.isCompleted}
            onChange={onChange}
          />
        )}
        <h4
          className={`${styles.todoiteminner__title} ${
            todo.isCompleted ? styles.todoiteminner__title_completed : ""
          }`}
        >
          {todo.title}
        </h4>
      </div>
      <p className={styles.todoiteminner__description}>{todo.description}</p>
      <p className={styles.todoiteminner__expireddate}>
        <span>Expired: </span>
        {todo.expiredDate}
      </p>
      {todo.isRemoved ? (
        <button
          className={styles.todoiteminner__delete}
          onClick={() => deleteTodo(todo.id)}
        >
          <span>Delete</span> &#128465;
        </button>
      ) : (
        <button
          className={styles.todoiteminner__delete}
          onClick={() => movoTodosToTrash(todo.id)}
        >
          <span>Move to trash</span>
          &#128465;
        </button>
      )}
    </div>
  );
};

export default TodoItemInner;
