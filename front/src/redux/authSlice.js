import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'auth/login',
    async function ({
        username,
        password
    }, {
        rejectWithValue
    }) {
        try {
            console.log('sending data')
            const response = await axios.post(`http://127.0.0.1:8000/auth/login`, {
                username: username,
                password: password
            })
            console.log('got data', response)
            const data = response.data;
            console.log(data)
            localStorage.setItem('token', data.Token);
            localStorage.setItem('user', JSON.stringify(data));
            const d = localStorage.getItem('token')
            console.log(d)
            return data;
        } catch (error) {
            console.log(error.response)
            if (error.response.status === 401 && error.response.data.detail) {
                return rejectWithValue(error.response.data.detail);
            }
            return rejectWithValue('Unexpected error');
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async function (_, {
        dispatch
    }) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(signOut());
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async function ({
        firstName,
        lastName,
        username,
        password
    }, {
        rejectWithValue
    }) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/auth/register`, {
                username: username,
                password: password,
                first_name: firstName,
                last_name: lastName,
            });
            console.log(response)
            const data = response;
            return data;
        } catch (error) {
            if (error.response.status === 400 && error.response.data.username) {
                return rejectWithValue(error.response.data.username)
            }
            return rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: {},
        status: null,
        error: null,
        isAuth: false
    },
    reducers: {
        signOut(state) {
            state.status = null;
            state.error = null;
            state.user = {};
            state.token = null;
            state.isAuth = false
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
            state.user = {};
            state.token = null;
            state.isAuth = false;
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.user = action.payload;
            state.token = action.payload.token;
            state.isAuth = true;
        },
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
            console.log(state.error)
            state.isAuth = false;
        },
        [register.rejected]: (state, action) => {
            state.status = 'rejected';
            state.isAuth = false;
            state.error = action.payload;
        }
    }
})

const {
    signOut
} = authSlice.actions;

export default authSlice.reducer
