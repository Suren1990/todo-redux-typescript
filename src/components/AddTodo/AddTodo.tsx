import cn from "classnames";
import { useAppDispatch } from "../../app/hooks";
import { Formik, Form, Field } from "formik";
import { addTodoAction } from "../../features/todoSlice";
import { FormProps, ITodo } from "../../models/ITodo";
import { addTodoSchema } from "../../schemas";

import styles from "./AddTodo.module.scss";

const AddTodo: React.FC = () => {
  const dispatch = useAppDispatch();

  const initialValues: FormProps = {
    title: "",
    description: "",
    expiredDate: "",
  };

  const addTodo = (title: string, description: string, expiredDate: string) => {
    const newTodo: ITodo = {
      id: String(Math.random()),
      title,
      description,
      expiredDate,
      isCompleted: false,
      isRemoved: false,
      isOverdue: false,
    };
    dispatch(addTodoAction(newTodo));
  };

  const saveTodoData = (values: FormProps) => {
    let { title, description, expiredDate } = values;

    if (title && description && expiredDate) {
      addTodo(title, description, expiredDate);
    }

    return;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTodoSchema}
      onSubmit={(values, { resetForm }) => {
        saveTodoData(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.addtodo}>
          <label
            className={cn(styles.addtodo__label, {
              [styles.addtodo__label_error]: errors.title && touched.title,
            })}
          >
            Add Title* {errors.title && touched.title && errors.title}
            <Field
              className={cn(styles.addtodo__input, {
                [styles.addtodo__input_error]: errors.title && touched.title,
              })}
              name="title"
            />
          </label>
          <label
            className={cn(styles.addtodo__label, {
              [styles.addtodo__label_error]:
                errors.description && touched.description,
            })}
          >
            Add Description* {errors.description && touched.description && errors.description}
            <Field
              as="textarea"
              className={cn(styles.addtodo__textarea, {
                [styles.addtodo__textarea_error]:
                  errors.description && touched.description,
              })}
              name="description"
            />
          </label>
          <label
            className={cn(styles.addtodo__label, {
              [styles.addtodo__label_error]:
                errors.expiredDate && touched.expiredDate,
            })}
          >
            Add Expired Date* {errors.expiredDate && touched.expiredDate && errors.expiredDate}
            <Field
              type="date"
              className={cn(styles.addtodo__input, {
                [styles.addtodo__input_error]:
                  errors.expiredDate && touched.expiredDate,
              })}
              name="expiredDate"
            />
          </label>
          <button type="submit" className={styles.addtodo__btn_add}>
            Add Todo
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodo;
