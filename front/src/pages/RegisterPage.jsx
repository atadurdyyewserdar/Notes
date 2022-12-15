import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SignUpForm from '../components/SignUpForm';
import { register } from '../redux/authSlice';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = ({ firstName, lastName, username, password }) => {
        dispatch(register({ firstName, lastName, username, password }));
        navigate('/login');
    }

    return (
        <div>
            <SignUpForm
                handleClick={handleSignUp}
            />
        </div>
    )
}

export default RegisterPage;