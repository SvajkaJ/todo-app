import React from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ToDoItem from './ToDoItem';
import ItemAdder from './ItemAdder';
import { TToDoList, TAction } from '../types/todo';
import { HOST } from '../constants';

interface IToDoListProps extends TToDoList {
    dispatchState: React.Dispatch<TAction>;
}

// Functional Component that manages a single list
const ToDoList = ({
    id,
    title,
    items,
    dispatchState
}: IToDoListProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const deleteList = () => {
        axios.delete<TToDoList>(
            `${HOST}/todolist/${id}`,
            {
                headers: {
                    Accept: "application/json",
                }
            }
        ).then((response) => {
            dispatchState({ type: "delete-list", payload: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`todo-list-${id}`}
            >
                <Typography component="h2" variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {
                    items.map((item) => {
                        return <ToDoItem key={`list-${item.todolistId}-${item.id}`} dispatchState={dispatchState} {...item}/>
                    })
                    }
                    <ItemAdder todolistId={id} dispatchState={dispatchState} />
                </List>
                <Button variant="contained" onClick={deleteList}>Delete List</Button>
                <Button variant="contained" onClick={() => setExpanded(false)}>Close</Button>
            </AccordionDetails>
        </Accordion>
    );
};

export default ToDoList;
