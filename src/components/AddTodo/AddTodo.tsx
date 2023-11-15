import { useRef, ChangeEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodoAction } from "../../features/todoSlice";
import { ITodo } from "../../models/ITodo";

import styles from "./AddTodo.module.scss";

const AddTodo: React.FC = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const expiredDateRef = useRef<HTMLInputElement>(null);

  const addTodo = (title: string, description: string, expiredDate: string) => {
    const newTodo: ITodo = {
      id: String(Math.random()),
      title,
      description,
      expiredDate,
      isCompleted: false,
    };
    dispatch(addTodoAction(newTodo));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = inputRef.current?.value;
    const description = textareaRef.current?.value;
    const expiredDate = expiredDateRef.current?.value;

    if (title && description && expiredDate) {
      addTodo(title, description, expiredDate);
      inputRef.current.value = "";
      textareaRef.current.value = "";
      expiredDateRef.current.value = "";
    }

    return;
  };

  return (
    <form className={styles.addtodo} onSubmit={onSubmit}>
      <label className={styles.addtodo__label}>
        Add Title*
        <input type="text" className={styles.addtodo__input} ref={inputRef} />
      </label>
      <label className={styles.addtodo__label}>
        Add Description*
        <textarea className={styles.addtodo__textarea} ref={textareaRef} />
      </label>
      <label className={styles.addtodo__label}>
        Add Expired Date*
      <input
        type="date"
        className={styles.addtodo__input}
        ref={expiredDateRef}
      />
        </label>
      <button className={styles.addtodo__btn_add}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
