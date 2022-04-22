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
    type: "set";
    payload: any;
};