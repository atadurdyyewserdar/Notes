import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async function ({
        page
    }, {
        rejectWithValue,
        dispatch,
    }) {
        try {
            console.log('sending data')
            const token = localStorage.getItem('token')
            const response = await axios.get(`http://127.0.0.1:8000/todo/`, {
                headers: {
                    Authorization: "Token " + token
                },
                params: {
                    "page": page
                }
            })
            console.log('got data', response)
            if (response.data.count === 5) {
                dispatch(pageUpdate(1))
            }
            return response.data;
        } catch (error) {
            console.log(error.response)
            return rejectWithValue('Unexpected error');
        }
    }
)

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async function ({
    id
}, {
    rejectWithValue,
    dispatch,
    getState
}) {
    try {
        console.log('sending data')
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://127.0.0.1:8000/todo/${id}`, {
            headers: {
                Authorization: "Token " + token
            }
        })
        const page = getState().page
        setTimeout(() => {
            dispatch(fetchTodos({
                page
            }));
        }, 500)
    } catch (error) {
        console.log(error.response)
        return rejectWithValue('Unexpected error');
    }
})

export const changeStatus = createAsyncThunk('todo/changeStatus', async function (todo, {
    rejectWithValue,
    dispatch
}) {
    try {
        console.log('sending data')
        console.log(todo)
        const token = localStorage.getItem('token')
        await axios.patch(`http://127.0.0.1:8000/todo/${todo.id}`, todo, {
            headers: {
                Authorization: "Token " + token
            }
        })
        setTimeout(() => {
            dispatch(toggleComplete(todo));
        }, 500)
    } catch (error) {
        console.log(error.response)
        return rejectWithValue('Unexpected error');
    }
})

export const addNewTodo = createAsyncThunk('todo/addNewTodo', async function (todo, {
    rejectWithValue,
    dispatch,
    getState
}) {
    try {
        console.log('sending data')
        console.log(todo)
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://127.0.0.1:8000/todo/`, todo, {
            headers: {
                Authorization: "Token " + token
            }
        })
        console.log('new item:', response);
        const page = getState().page
        setTimeout(() => {
            dispatch(fetchTodos({
                page
            }));
        }, 500)
    } catch (error) {
        console.log(error.response)
        return rejectWithValue('Unexpected error');
    }
})

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        status: null,
        error: null,
        updateStatus: null,
        page: 0,
        count: 0
    },
    reducers: {
        addNewItem: (state, action) => {
            state.todos.push(action.payload)
            state.updateStatus = 'resolved'
        },
        removeItem: (state, action) => {
            state.error = null;
            state.updateStatus = 'resolved'
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        },
        toggleComplete: (state, action) => {
            state.error = null;
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.todo_status = action.payload.todo_status;
            toggledTodo.todo_text = action.payload.todo_text;
            toggledTodo.created_date = action.payload.create_date;
            state.updateStatus = 'resolved'
        },
        pageUpdate: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.updateStatus = 'resolved'
            state.todos = action.payload.results;
            state.count = Math.ceil(action.payload.count / 5);
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [changeStatus.rejected]: (state, action) => {
            state.error = action.payload;
            state.updateStatus = 'rejected';
        },
        [changeStatus.pending]: (state) => {
            state.error = null;
            state.updateStatus = 'loading'
        },
        [deleteTodo.pending]: (state) => {
            state.error = null;
            state.updateStatus = 'loading'
        },
        [addNewTodo.pending]: (state) => {
            state.error = null;
            state.updateStatus = 'loading'
        },
        [addNewTodo.error]: (state, action) => {
            state.error = action.payload;
            state.updateStatus = 'loading'
        },
    }
})

export const {
    removeItem,
    toggleComplete,
    addNewItem,
    pageUpdate
} = todoSlice.actions;

export default todoSlice.reducer