import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';

const Nav = (props) => {
    return (
        <div style={{padding:'0.5% 2%'}}>
            <Grid container justify='space-between'>
                <Grid item>
                <Typography style={{display:'inline-block'}} variant='h6'>
                    neat
                </Typography>
                &nbsp;
                <Typography style={{display:'inline-block'}} variant='h6'>
                    maps
                </Typography>
                </Grid>
                {props.children}
            </Grid>
        </div>
    )
};

export default Nav;