import { ChangeEvent, useRef } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { ITodo } from "../../../models/ITodo";
import { addTodoAction } from "../../../features/todoSlice";

import styles from "./TodoEdit.module.scss";

interface TodoEditProps {
  todo: ITodo;
  setIsEdit: (value: boolean) => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, setIsEdit }) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const expiredDateRef = useRef<HTMLInputElement>(null);

  const editTodo = (
    title: string,
    description: string,
    expiredDate: string
  ) => {
    const newTodo: ITodo = {
      id: String(Math.random()),
      title,
      description,
      expiredDate,
      isCompleted: false,
      isRemoved: false,
    };
    dispatch(addTodoAction(newTodo));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = inputRef.current?.value;
    const description = textareaRef.current?.value;
    const expiredDate = expiredDateRef.current?.value;

    if (title && description && expiredDate) {
      editTodo(title, description, expiredDate);
      inputRef.current.value = "";
      textareaRef.current.value = "";
      expiredDateRef.current.value = "";

      setIsEdit(false);
    }

    return;
  };

  return (
    <form className={styles.todoedit} onSubmit={onSubmit}>
      <input type="text" className={styles.addtodo__input} value={todo.title} ref={inputRef} />
      <textarea className={styles.addtodo__textarea} value={todo.description} ref={textareaRef} />
      <input
        type="date"
        className={styles.addtodo__input}
        value={todo.expiredDate}
        ref={expiredDateRef}
      />
      <button className={`btn ${styles.todoedit__save}`}>Save</button>
    </form>
  );
};

export default TodoEdit;
