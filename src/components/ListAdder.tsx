import React from 'react';
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { TToDoList, TAction } from '../types/todo';
import { HOST } from '../constants';

interface IListAdderProps {
    dispatchState: React.Dispatch<TAction>;
}

// Functional Component responsible for adding new list
const ListAdder = ({ dispatchState }: IListAdderProps) => {
    const [title, setTitle] = React.useState<string>("");

    // Function calls mockapi endpoint to add the list
    const addList = () => {
        axios.post<TToDoList>(
            `${HOST}/todolist`,
            { title, items: [] },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        ).then((response) => {
            dispatchState({ type: "add-list", payload: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <Accordion expanded={false}>
            <AccordionDetails>
                <TextField
                    id="todo-list-add"
                    label="Title"
                    variant="standard"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <IconButton aria-label="add" onClick={addList}>
                    <AddIcon />
                </IconButton>
            </AccordionDetails>
        </Accordion>
    );
};

export default ListAdder;
