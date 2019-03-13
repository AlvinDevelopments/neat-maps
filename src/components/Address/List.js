import React from 'react';
import { TableRow, TableCell, Table, Typography, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';

const AddressList = (props) => {
    console.log(props.categories);
    return (
        <Table>
            <TableBody>

            <TableRow>
                <TableCell align='left'>
                    <Typography variant='button'>
                        Address
                    </Typography>
                </TableCell>
                <TableCell align='left'>
                    <Typography variant='button'>
                        City
                    </Typography>
                </TableCell>
                <TableCell align='left'>
                    <Typography variant='button'>
                        State
                    </Typography>
                </TableCell>
                <TableCell align='left'>
                    <Typography variant='button'>
                        Zip Code
                    </Typography>
                </TableCell>
                <TableCell align='left'>
                    <Typography variant='button'>
                        Category
                    </Typography>
                </TableCell>
            </TableRow>
            {
                props.locationList && props.locationList.map(location => 
                    <TableRow>
                        <TableCell>
                            {location.address}
                        </TableCell>
                        <TableCell>
                            {location.city}
                        </TableCell>
                        <TableCell>
                            {location.state}
                        </TableCell>
                        <TableCell>
                            {location.zipCode}
                        </TableCell>
                        <TableCell style={{
                            color: props.categories && 
                            props.categories.length > 0 && 
                            props.categories.find(c=>{return c.category === location.category}) && 
                            props.categories.find(c=>{return c.category === location.category}).color
                        }}>
                            {location.category}
                        </TableCell>
                    </TableRow>
                )
            }
            </TableBody>
        </Table>
    );
}

const mapStateToProps = (state) => ({
    categories: state.locationCategories[state.selectedLocationData]
})

export default connect(
    mapStateToProps
)(AddressList);