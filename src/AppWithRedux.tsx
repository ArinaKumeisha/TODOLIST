import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithRedux = () => {
    console.log("app")
    const dispatch = useDispatch() //метод редаксовского стора

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)  //диспатчим action в редьюсер
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = changeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }, [dispatch])


    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodoLists = tasks[tl.id]


// GUI - графический UI: кнопочки, картинки, и тд // CLI -  Command Line Interface- путем ввода в коммандную строку
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "20px"}}>
                    <Todolist
                        key={tl.id}
                        todoListID={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoLists}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    const gridStyle = {padding: "20px 0"}
    return (

        <div className="App">
            <AppBar position="static">

                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>   {/* fixed - фиксированная ширина*/}
                <Grid container style={gridStyle}>   {/* это 1 ряд*/}
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>   {/* это 2 ряд*/}
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )
}


