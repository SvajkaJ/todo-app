import React from 'react';
import axios from 'axios';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { HOST } from '../constants';
import { TToDoItem, TAction } from '../types/todo';

interface IToDoItemProps extends TToDoItem {
    dispatchState: React.Dispatch<TAction>;
}

const ToDoItem = ({
    id,
    todolistId,
    title,
    text,
    deadline,
    state,
    dispatchState
}: IToDoItemProps) => {

    const dl = new Date(deadline * 1000);

    const toggleCheckbox = () => {
        axios.put<TToDoItem>(
            `${HOST}/todolist/${todolistId}/todoitem/${id}`,
            { id, todolistId, title, text, deadline, state: (state === 0 ? 1 : 0) },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        ).then((response) => {
            dispatchState({ type: "put-item", payload: response.data });
        })
        .catch((error) => {
            console.log(error)
        });
    };

    const deleteItem = () => {
        axios.delete<TToDoItem>(
            `${HOST}/todolist/${todolistId}/todoitem/${id}`,
            {
                headers: {
                    Accept: "application/json",
                }
            }
        ).then((response) => {
            dispatchState({ type: "delete-item", payload: response.data });
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
            <ListItemIcon>
                <Checkbox
                    checked={state === 1}
                    onClick={toggleCheckbox}
                />
            </ListItemIcon>
            <ListItemText
                primary={title}
                secondary={
                    <>
                    <span>{text}</span>
                    <br />
                    <span>{dl.valueOf() === 0 ? "N/A" : dl.toLocaleString()}</span>
                    </>
                }
                style={state === 1 ? { textDecoration: "line-through" } : {}}
            />
            <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={deleteItem}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ToDoItem;
