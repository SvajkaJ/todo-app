import React from 'react';
import axios from 'axios';

import { Container, Typography } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';

import { TToDoItem, TToDoList, TAction } from "./types/todo";
import { HOST } from './constants';
import './App.css';

import ToDoList from "./components/ToDoList";

const appReducer = (state: TToDoList[], action: TAction): TToDoList[] => {
    switch(action.type) {
        case "set":
            return action.payload;
        default:
            return [];
    }
};

const defaultState: TToDoList[] = [];

const App = () => {
    const [state, dispatchState] = React.useReducer(appReducer, defaultState); // default: empty

    const getData = () => {
        axios.get<TToDoList[]>(`${HOST}/todolist`)
        .then((response) => { // type is implied
            if (response.status === 200) {
                dispatchState({ type: "set", payload: response.data });
            }
        })
        .catch(() => {

        })
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Container className="todo-app-container">
            <>
            <Typography variant="h1">Hello</Typography>

            {/* Action buttons */}
            <Card>
                Add
                Filter
            </Card>

            {
                state.map((item) => {
                    return <ToDoList key={`list-${item.id}`} dispatchState={dispatchState} {...item}/>
                })
            }
            
            </>
        </Container>
    );
};

export default App;
