import cn from "classnames";
//import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { Formik, Form, Field } from "formik";
import { EditTodo, FormProps, ITodo } from "../../../models/ITodo";
import { editTodoAction } from "../../../features/todoSlice";
import { addTodoSchema } from "../../../schemas";

import styles from "./TodoEdit.module.scss";

interface TodoEditProps {
  todo: ITodo;
  setIsEdit: (value: boolean) => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, setIsEdit }) => {
  const dispatch = useAppDispatch();

  const initialValues: FormProps = {
    title: todo.title,
    description: todo.description,
    expiredDate: todo.expiredDate,
  };

  // const [title, setTitle] = useState<string>(todo.title);
  // const [description, setDescription] = useState<string>(todo.description);
  // const [expiredDate, setExpiredDate] = useState<string>(todo.expiredDate);

  const editTodo = (
    title: string,
    description: string,
    expiredDate: string
  ) => {
    const editedTodo: EditTodo = {
      id: todo.id,
      title,
      description,
      expiredDate,
    };
    dispatch(editTodoAction(editedTodo));
  };

  const saveEditedTodoData = (values: FormProps) => {
    console.log("aaaaaaaaaaaaaa");
    

    let { title, description, expiredDate } = values;

    if (title && description && expiredDate) {
      editTodo(title, description, expiredDate);
      setIsEdit(false);
    }

    return;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTodoSchema}
      onSubmit={(values) => {
        saveEditedTodoData(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.todoedit}>
          <h4 className={styles.todoedit__title}>Edit Todo</h4>
          <Field
            className={cn(styles.todoedit__input, {
              [styles.todoedit__input_error]: errors.title && touched.title,
            })}
            name="title"
          />
          {errors.title && touched.title && <p className={styles.todoedit__error}>{errors.title}</p>}
          <Field
            as="textarea"
            className={cn(styles.todoedit__textarea, {
              [styles.todoedit__textarea_error]:
                errors.description && touched.description,
            })}
            name="description"
          />
          {errors.title && touched.title && <p className={styles.todoedit__error}>{errors.title}</p>}
          <Field
            type="date"
            className={cn(styles.todoedit__input, {
              [styles.todoedit__input_error]:
                errors.expiredDate && touched.expiredDate,
            })}
            name="expiredDate"
          />
          {errors.expiredDate && touched.expiredDate && (
            <p className={styles.todoedit__error}>{errors.expiredDate}</p>
          )}
          <button type="submit" className={`btn ${styles.todoedit__save}`}>Save</button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoEdit;
