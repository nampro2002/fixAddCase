import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { title } from "process";

export interface Todo  {
    id:string
    title: string
    completed :boolean
}

interface initState {
    todoList: Todo[]
}


const initialState:initState = {
    todoList:[]
}

export const getAllTodo = createAsyncThunk('todoList/getAllTodo',async (_, thunkAPI)=>{
    const res = await axios.get<Todo[]>('http://localhost:3004/todos',{
        signal:thunkAPI.signal
    })
    console.log(res.data);
    
    return res.data
})
export const addTodo = createAsyncThunk('todoList/addTodo',async (newTodo:Todo)=>{
    const res = await axios.post<Todo>('http://localhost:3004/todos',newTodo)
    console.log(res.data);
    
    return res.data
})
export const deleteTodo = createAsyncThunk('todoList/deleteTodo',async (todoId:string)=>{
    await axios.delete(`http://localhost:3004/todos/${todoId}`)
    
    return todoId
})
export const updateTodo = createAsyncThunk('todoList/deleteTodo',async (newTodo:Todo)=>{
    const res = await axios.patch<Todo>(`http://localhost:3004/todos/${newTodo.id}`,newTodo)
    console.log(res.data);
    
    return res.data
})

const todoSlice = createSlice({
    name:'todoList',
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder.addCase(getAllTodo.fulfilled,(state, action)=>{
            state.todoList = action.payload
        }).addCase(addTodo.fulfilled, (state, action)=>{
            state.todoList.push(action.payload)
        }).addCase(deleteTodo.fulfilled, (state, action)=>{
            state.todoList = state.todoList.filter(todo=>todo.id !== action.payload)
        }).addCase(updateTodo.fulfilled, (state, action)=>{
          console.log(action.payload);
          
        }).addCase(updateTodo.pending, (state, action)=>{
          console.log(action.payload);
          
        }).addCase(updateTodo.rejected, (state, action)=>{
          console.log(action.payload);
          
        })
    },
})



const {} =todoSlice.actions
const todoReducer =todoSlice.reducer
export default todoReducer