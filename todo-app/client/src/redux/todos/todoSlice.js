import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getTodoAsync = createAsyncThunk("todos/getTodosAsync",async()=>{
    const res = await axios(`http://localhost:7000/todos`)
    return await res.data
})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async(data)=>{
    const res = await axios.post(`http://localhost:7000/todos`,data)
    return await res.data
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync",async ({id ,data})=>{
    const res = await axios.patch(`http://localhost:7000/todos/${id}`,data)
    return await res.data
})

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync",async (id)=>{
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})

export const todoSlice = createSlice({
    name : "todos",
    initialState: {
        items : [],
        isLoading:false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
        addNewTodoIsloading: false,
        addNewTodoError: null
    },
    reducers : {
        changeActiveFilter: (state, action) =>{
            state.activeFilter = action.payload;
        },
        clearCompleted : (state) => {
            const filtred = state.items.filter((item) => item.completed === false)
            state.items = filtred
        }

    },
    extraReducers: (builder) => {
        //get Todos
        builder
            .addCase(getTodoAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodoAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(getTodoAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            //add Todos
            .addCase(addTodoAsync.pending, (state, action) => {
                state.addNewTodoIsloading = true   
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.addNewTodoIsloading = false 
                state.items.push(action.payload);      
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodoIsloading = false 
                state.addNewTodoError = action.error.message;
            })
            // toggle
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const {id , completed}= action.payload
                const index = state.items.findIndex((item) => item.id === id)
                state.items[index].completed = completed;    
            })
            // remove
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                const id = action.payload;
                const filtred = state.items.filter((item) => item.id !== id)
                state.items = filtred
            })
    }    
})

export const selectTodos = (state)=> state.todos.items;
export const selectFiltredTodos = (state) => {
    if(state.todos.activeFilter === "all"){
        return state.todos.items;
    }

    return state.todos.items.filter((todo)=>(
        state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true
    ))
}
export const selectActiveFilter = (state)=> state.todos.activeFilter;
export const {changeActiveFilter,clearCompleted}  = todoSlice.actions
export default todoSlice.reducer