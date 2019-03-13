import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider, AppBar } from '@material-ui/core';

const Nav = (props) => {
    return (
            <Grid style={{padding:'0.5% 2%'}} container justify='space-between'>
                <Grid item>
                <a href='/'>
                    <Typography style={{display:'inline-block'}} variant='h4'>
                        neat maps
                    </Typography>
                </a>
                </Grid>
                {props.children}
            </Grid>
    )
};

export default Nav;