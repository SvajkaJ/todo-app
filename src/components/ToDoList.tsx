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
import { TToDoList, TToDoItem, TAction, TFilter } from '../types/todo';
import { HOST } from '../constants';

function doFiltering(filter: TFilter, item: TToDoItem): boolean {
    let flag: boolean;

    // Filter the state of the task (all | finished | unfinished)
    switch (filter.state) {
        case 2:
            // only unfinished => state === 0
            flag = (item.state === 0);
            break;
        case 1:
            // only finished => state === 1
            flag = (item.state === 1);
            break;
        case 0:
        default:
            // all
            flag = true;
            break;
    }

    if (flag === true) {
        // Filter according to the query
        if (filter.query === "")
            return true;
        else {
            // debouncing would be great
            const itemString = item.id + item.todolistId + item.title + item.text + new Date(item.deadline * 1000).toLocaleString();
            return itemString.includes(filter.query);
        }
    }
    return false;
}

interface IToDoListProps extends TToDoList {
    dispatchState: React.Dispatch<TAction>;
    filter: TFilter;
}

// Functional Component that manages a single list
const ToDoList = ({
    id,
    title,
    items,
    dispatchState,
    filter
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

    const sanitizedItems = items.filter((item) => doFiltering(filter, item));

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`todo-list-${id}`}
            >
                <Typography component="h2" variant="h5">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {
                    sanitizedItems.map((item) => (
                        <ToDoItem
                            key={`list-${item.todolistId}-${item.id}`}
                            dispatchState={dispatchState}
                            {...item}
                        />
                    ))
                    }
                    <ItemAdder todolistId={id} dispatchState={dispatchState} />
                </List>
                <Button variant="contained" onClick={deleteList}>Delete List</Button>
                <Button variant="contained" onClick={() => setExpanded(false)} style={{ marginLeft: "1em" }}>Close</Button>
            </AccordionDetails>
        </Accordion>
    );
};

export default ToDoList;
