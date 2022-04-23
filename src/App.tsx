import React from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { TToDoList, TAction, TFilter } from './types/todo';
import { HOST } from './constants';

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
    const [filter, setFilter] = React.useState<TFilter>({ query: "", state: 0 });

    const handleFilterInputs = (event: any) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    React.useEffect(() => {
        axios.get<TToDoList[]>(`${HOST}/todolist`)
        .then((response) => { // type is implied
            if (response.status === 200) {
                dispatchState({ type: "set", payload: response.data });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container className="todo-app-container">
            <>
            <Typography component="h1" variant="h4">Your ToDo App</Typography>

            {/* Search query input field */}
            <Card>
                <CardContent>
                    <Typography component="h2" variant="h5">Filter</Typography>
                    <TextField
                        id="todo-app-search-query"
                        label="Query substring"
                        placeholder="Search..."
                        variant="standard"
                        name="query"
                        value={filter.query}
                        onChange={handleFilterInputs}
                    />
                    <FormControl style={{ marginLeft: "1em" }}>
                        <InputLabel id="todo-app-state-select">State</InputLabel>
                        <Select
                            labelId="todo-app-state-select"
                            id="todo-app-state-select"
                            value={filter.state}
                            label="State"
                            name="state"
                            onChange={handleFilterInputs}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>Only finished</MenuItem>
                            <MenuItem value={2}>Only unfinised</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>

            {/* Rendering the lists */}
            {
                state.map((list) => {
                    return <ToDoList key={`list-${list.id}`} dispatchState={dispatchState} filter={filter} {...list}/>
                })
            }

            {/* Add new list section */}
            <ListAdder dispatchState={dispatchState} />
            </>
        </Container>
    );
};

export default App;
