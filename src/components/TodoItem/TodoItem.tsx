import { useState } from "react";
import { ITodo } from "../../models/ITodo";
import TodoEdit from "./TodoEdit/TodoEdit";
import TodoItemInner from "./TodoItemInner/TodoItemInner";

import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: ITodo;
  activeTab: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, activeTab }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const editHandle = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className={styles.todoitem}>
      {!isEdit && (
        <button
          className={`btn ${styles.todoitem__edit}`}
          onClick={editHandle}
        >
          Edit
        </button>
      )}
      {isEdit ? (
        <TodoEdit todo={todo} setIsEdit={setIsEdit} />
      ) : (
        <TodoItemInner todo={todo} activeTab={activeTab} />
      )}
    </div>
  );
};

export default TodoItem;
