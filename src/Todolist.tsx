import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);
    }

    const onclickRemoveTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    const onAllClickHandler = () => props.changeTodoListFilter
    ("all", props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter
    ("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter
    ("completed", props.todoListID);

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

            <IconButton
                onClick={onclickRemoveTodoList}
                color={"primary"}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: "none"}}>

            {props.tasks.map(t => {
                let taskClass = t.isDone ? "is-done" : ""
                const removeTask = () => props.removeTask(t.id, props.todoListID)

                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus
                    (t.id, e.currentTarget.checked, props.todoListID)
                }

                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(t.id, title, props.todoListID)
                }

                return <li className={taskClass}
                           key={t.id}>

                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}/>

                    <EditableSpan
                        title={t.title}
                        changeTitle={changeTaskTitleHandler}/>
                    <IconButton
                        color={"primary"}
                        onClick={removeTask}
                        size={"small"}>
                        <Delete fontSize={"small"}/>
                    </IconButton>
                </li>
            })
            }
        </ul>
        <div>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === "all" ? "secondary" : "primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === "active" ? "secondary" : "primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === "completed" ? "secondary" : "primary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
