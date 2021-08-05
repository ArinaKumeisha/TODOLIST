import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";

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
    changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("todoList")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID);
    },[props])

    const onclickRemoveTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    const onAllClickHandler = () => props.changeTodoListFilter
    (props.todoListID, "all");
    const onActiveClickHandler = () => props.changeTodoListFilter
    (props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeTodoListFilter
    (props.todoListID, "completed");

    let tasksForTodoLists;
    switch (props.filter) {
        case "active" :
            tasksForTodoLists = props.tasks.filter(t => !t.isDone)
            break
        case "completed":
            tasksForTodoLists = props.tasks.filter(t => t.isDone)
            break
        default:
            tasksForTodoLists = props.tasks
    }
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

        <ul  style={{listStyle: "none"}}>

            {
                props.tasks.map(t => {
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
})
