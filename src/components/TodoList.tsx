import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTodo, deleteTodo, getAllTodo, Todo, updateTodo } from '../redux/todoSlice'

export default function TodoList() {
    const [input, setInput] = useState('')
    const [idUpdate, setIdUpdate] = useState('')
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(state => state.todoList.todoList)
    useEffect(() => {
        const promise = dispatch(getAllTodo())
        return () => {
            promise.abort()
        }
    }, [])
    const handleAddTodo = () => {
       if(idUpdate!==''){
        dispatch(updateTodo({
            id: idUpdate,
            title: input,
            completed: false
        }))
       }else{
        dispatch(addTodo({
            id: nanoid(),
            title: input,
            completed: false
        }))
       }
        setInput('')
        setIdUpdate('')
    }
    const handleDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(
            todoId
        ))
    }
    const handleUpdateTodo = (todo: Todo) => {
       setInput(todo.title)
       setIdUpdate(todo.id)
    }
    return (

        <div>
            <input type="text" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
            <button onClick={handleAddTodo}>Add</button>
            {
                todoList.map(todo => (
                    <li key={todo.id}>{todo.title}
                        <button onClick={() => handleUpdateTodo(todo)}>Update</button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))
            }
        </div>
    )
}
