import React from 'react';
import axios from 'axios';

import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import AddIcon from '@mui/icons-material/Add';

import { TToDoItem, TAction } from '../types/todo';
import { HOST } from '../constants';

interface IItemAdderProps {
    todolistId: string;
    dispatchState: React.Dispatch<TAction>;
}

// Functional Component responsible for adding new item to the list
const ItemAdder = ({ todolistId, dispatchState }: IItemAdderProps) => {
    const [title, setTitle] = React.useState<string>("");
    const [text, setText] = React.useState<string>("");
    const [deadline, setDeadline] = React.useState<string>("");

    const addItem = () => {
        const dl = Math.floor(new Date(deadline).valueOf() / 1000);
        axios.post<TToDoItem>(
            `${HOST}/todolist/${todolistId}/todoitem`,
            { todolistId, title, text, deadline: dl, state: 0 },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        ).then((response) => {
            dispatchState({ type: "add-item", payload: response.data});
            setTitle("");
            setText("");
            setDeadline("");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <ListItem
            divider={true}
            disablePadding
        >
            <Grid
                container
                columnSpacing={2}
                alignItems="center"
            >
                <Grid item xs={12} md={4} style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                <TextField
                    id="todo-item-adder-title"
                    label="Title"
                    variant="standard"
                    fullWidth={true}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                </Grid>
                <Grid item xs={12} md={4} style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                <TextField
                    id="todo-item-adder-text"
                    label="Text"
                    variant="standard"
                    fullWidth={true}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                </Grid>
                <Grid item xs={12} md={4} style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                <label htmlFor="todo-item-adder-deadline">Deadline:</label>
                <input
                    type="datetime-local"
                    id="todo-item-adder-deadline"
                    name="todo-item-adder-deadline"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                />
                </Grid>
            </Grid>
            <ListItemSecondaryAction>
                <IconButton aria-label="add" onClick={addItem}>
                    <AddIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ItemAdder;
