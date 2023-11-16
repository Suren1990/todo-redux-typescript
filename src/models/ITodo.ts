export interface ITodo {
    id: string;
    title: string;
    description: string;
    expiredDate: string;
    isCompleted: boolean;
    isRemoved: boolean;
    isOverdue: boolean;
}

export interface EditTodo {
    id: string;
    title: string;
    description: string;
    expiredDate: string;
}

export interface FormProps {
    title: string;
    description: string;
    expiredDate: string;
}
