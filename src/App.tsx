import React from 'react';
import axios from 'axios';
import './App.css';

type ToDoItem = {
    id: string;
    todolistId: string;
    title: string;
    text: string;
    deadline: Date;
    state: number;
};

type ToDoList = {
    id: string;
    title: string;
    items: ToDoItem[];
};

const App = () => {
    const [state, setState] = React.useState<ToDoList[]>([]); // default: empty

    React.useEffect(() => {
        
    }, []);

    return (
        <div>
            Hello
        </div>
    );
};

export default App;
