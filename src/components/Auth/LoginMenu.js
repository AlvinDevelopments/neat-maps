import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions';

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

    handleSubmit = () => {
        this.props.handleLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <form>
                <TextField
                fullWidth
                onKeyDown={(e)=>{e.keyCode === 13 && this.handleSubmit()}}
                onChange={(e)=>this.handleUsername(e.target.value)}
                value={this.state.username}
                label='username'
                />
                <br/>
                <TextField
                fullWidth
                onKeyDown={(e)=>{e.keyCode === 13 && this.handleSubmit()}}
                onChange={(e)=>this.handlePassword(e.target.value)}
                value={this.state.password}
                label='password'
                type='password'
                />
                <Button
                style={{
                    margin:'5% 0%'
                }}
                fullWidth
                variant='contained'
                onClick={this.handleSubmit}>
                    Login
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    handleLogin: (email, password) => dispatch(signIn(email, password))
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoginMenu);