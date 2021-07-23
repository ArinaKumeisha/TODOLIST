import {TaskStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type ActionsType = RemoveTaskAT |
    AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}

export type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todoListID: string
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todoListID: string
}


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t => t.id !== action.taskID)
            return stateCopy
        }

        case "ADD-TASK" : {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            stateCopy[action.todoListID] = [newTask, ...tasks]
            return stateCopy

            /* return {...state, [action.todoListID]:[newTask,...state[action.todoListID]]}*/
        }

        case "CHANGE-TASK-STATUS" : {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => {
                    if (t.id === action.taskID) {
                        return {...t, isDone: action.isDone}
                    } else {
                        return t
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE" : {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todoListID]  //удаляем свойство объекта
            return stateCopy
        }


        case "ADD-TODOLIST": {
            return {...state, [action.todoListID]: []}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: "ADD-TASK", title, todoListID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", title, todoListID, taskID}
}





