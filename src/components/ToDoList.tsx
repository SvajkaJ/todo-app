import React from "react";

import { Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Box, Divider } from '@mui/material';
import { Button } from '@mui/material';
import List from '@mui/material/List';

import ExpandMore from '@mui/icons-material/ExpandMore';

import ToDoItem from "./ToDoItem";
import { TToDoList, TAction } from "../types/todo";

interface IToDoListProps extends TToDoList {
    dispatchState: React.Dispatch<TAction>;
}

// Functional Component that controlls single list
const ToDoList = (props: IToDoListProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const addItem = () => {};

    const { id, title, items, dispatchState } = props;

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                id={`todo-list-${id}`}
            >
                <Typography variant="h2">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {
                    items.map((item) => {
                        return <ToDoItem key={`list-${item.todolistId}-${item.id}`} dispatchState={dispatchState} {...item}/>
                    })
                    }
                </List>
                <Button variant="contained" onClick={addItem}>Add</Button>
                <Button variant="contained" onClick={() => setExpanded(false)}>Close</Button>
            </AccordionDetails>
        </Accordion>
    );
};

export default ToDoList;
