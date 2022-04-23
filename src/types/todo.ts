export type TToDoItem = {
    id: string;
    todolistId: string;
    title: string;
    text: string;
    deadline: number;
    state: number;
};

export type TToDoList = {
    id: string;
    title: string;
    items: TToDoItem[];
};

export type TAction = {
    type: "set" | "add-list" | "delete-list" | "add-item" | "delete-item" | "put-item";
    payload: any;
};