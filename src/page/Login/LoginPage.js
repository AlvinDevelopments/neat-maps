import React from 'react';
import { Paper } from '@material-ui/core';
import LoginMenu from '../../components/Auth/LoginMenu';

const LoginPage = (props) => {
    return (
        <div>
            <Paper>
                Login
                <LoginMenu/>
            </Paper>
        </div>
    )
}

export default LoginPage;