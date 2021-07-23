import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "NoteBook", isDone: true},
            {id: v1(), title: "Car", isDone: false},
            {id: v1(), title: "Scooter", isDone: true}
        ]
    })




    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks});
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.map(t =>
            t.id === taskID ? {...t, title: title} : t)
        setTasks({...tasks})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const upDatedTodoLists = todoLists.map(tl => {
            if (tl.id === todoListID) {
                return {...tl, title: title}
            }
            return tl
        })
        setTodoLists(upDatedTodoLists)
    }



    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodoLists;
        switch (tl.filter) {
            case "active" :
                tasksForTodoLists = tasks[tl.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForTodoLists = tasks[tl.id].filter(t => t.isDone)
                break
            default:
                tasksForTodoLists = tasks[tl.id]
        }


// GUI - графический UI: кнопочки, картинки, и тд // CLI -  Command Line Interface- путем ввода в коммандную строку
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "20px"}}>
                    <Todolist
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


export default App;
