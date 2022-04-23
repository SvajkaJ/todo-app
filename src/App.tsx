import React from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { TToDoList, TAction } from './types/todo';
import { HOST } from './constants';
import './App.css';

import ListAdder from './components/ListAdder';
import ToDoList from "./components/ToDoList";

const appReducer = (state: TToDoList[], action: TAction): TToDoList[] => {
    switch(action.type) {
        case "set":
            return action.payload;
        case "add-list":
            // payload: TToDoList
            return [ ...state, action.payload ];
        case "delete-list":
            // payload: TToDoList
            return state.filter((list) => list.id !== action.payload.id);
        case "add-item":
            // payload: TToDoItem
            return state.map((list) => {
                if (list.id === action.payload.todolistId) {
                    return {
                        ...list,
                        items: [ ...list.items, action.payload]
                    };
                }
                return list;
            });
        case "delete-item":
            // payload: TToDoItem
            return state.map((list) => {
                if (list.id === action.payload.todolistId) {
                    return {
                        ...list,
                        items: list.items.filter((item) => item.id !== action.payload.id)
                    };
                }
                return list;
            });
        case "put-item":
            // payload: TToDoItem
            return state.map((list) => {
                if (list.id === action.payload.todolistId) {
                    return {
                        ...list,
                        items: list.items.map((item) => {
                            if (item.id === action.payload.id) {
                                return action.payload;
                            }
                            return item;
                        })
                    };
                }
                return list;
            });
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
        .catch((error) => {
            console.log(error);
        });
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
                Add Filter
            </Card>

            {
                state.map((list) => {
                    return <ToDoList key={`list-${list.id}`} dispatchState={dispatchState} {...list}/>
                })
            }

            {/* Add new list section */}
            <ListAdder dispatchState={dispatchState} />
            </>
        </Container>
    );
};

export default App;
