import {TaskStateType, TodolistType} from "../App";
import {addTodoListAC, removeTodoListAC, todoListReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState); //возвращает новый массив со
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;


    expect(idFromTasks === idFromTodolists).toBe(true);

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});


