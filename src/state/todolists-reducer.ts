import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType = RemoveTodoListAT |
    AddTodoListAT |
    ChangeTodoListFilterAT |
    ChangeTodoListTitleAT

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListID: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListID: string
    value: FilterValuesType
}

export let todoListID_1 = v1()
export let todoListID_2 = v1()
const initialState: Array<TodolistType> = []
export const todoListReducer = (todoLists=initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST" :
            const newTodoList: TodolistType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
            }
            return [newTodoList,...todoLists ]

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)
        default:
        return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}

export const changeTodoListFilterAC = (todoListID: string, value: FilterValuesType): ChangeTodoListFilterAT => {  //функции АС надо писать с маленькой буквы
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID: todoListID, value: value
    }
}

export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", todoListID: todoListID, title: title}
}

