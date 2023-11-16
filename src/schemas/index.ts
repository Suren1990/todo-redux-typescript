import * as yup from "yup";

export const addTodoSchema = yup.object().shape({
    title: yup
        .string()
        .min(2, "Min 2 symbols")
        .max(50, "Max 50 symbols")
        .required("Required"),
    description: yup
        .string()
        .min(10, "Min 10 symbols")
        .max(200, "Max 200 symbols")
        .required("Required"),
    expiredDate: yup
        .string()
        .test("Date validation", "Selected should after now", (value) => {
            if (value) {
                return Date.now() <= new Date(value).getTime();
            }
            return false;
        })
        .required("Required"),
});
