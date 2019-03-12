import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class LoginMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsername = (value) => {
        this.setState({
            username: value
        });
    }

    handlePassword = (value) => {
        this.setState({
            password: value
        });
    }

    render() {
        return (
            <div>
                <TextField
                onChange={(e)=>this.handleUsername(e.target.value)}
                value={this.state.username}
                label='username'
                />
                <br/>
                <TextField
                onChange={(e)=>this.handlePassword(e.target.value)}
                value={this.state.password}
                label='password'
                type='password'
                />
                <br/>
                <Button>
                    Login
                </Button>
            </div>
        )
    }
}

export default LoginMenu;