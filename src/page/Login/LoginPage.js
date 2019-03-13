import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import LoginMenu from '../../components/Auth/LoginMenu';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
    authBox: {
        // ...getCenter(),
        // position:'absolute',
        padding:'2% 5%',
        width:'300px',
        height: '200px',
        margin: 'auto'
    }
});

const getCenter = () => {
    return {
        left: `50%`,
        top: `50%`
    }
}

const LoginPage = (props) => {
    const { classes } = props;
    return (
        <div>
            <Paper className={classes.authBox}>
                <Typography variant='h4'>
                    Login
                </Typography>
                <LoginMenu/>
            </Paper>
        </div>
    )
}




export default withStyles(styles)(LoginPage);