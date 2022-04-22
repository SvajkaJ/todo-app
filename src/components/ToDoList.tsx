import React from "react";

import { Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';

import ToDoItem from "./ToDoItem";
import { TToDoList } from "../types/todo";

interface IToDoListProps extends TToDoList {}

// Functional Component that controlls single list
const ToDoList = (props: IToDoListProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const { id, title, items } = props;

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                id={`todo-list-${id}`}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    items.map((item) => {
                        return <ToDoItem {...item}/>
                    })
                }
            </AccordionDetails>
        </Accordion>
    );
};

export default ToDoList;
