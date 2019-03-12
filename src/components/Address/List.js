import React from 'react';
import { TableRow, TableCell, Table } from '@material-ui/core';

const AddressList = (props) => {
    return (
        <div>
            <Table>
                <TableRow>
                    <TableCell align='left'>
                        Address
                    </TableCell>
                    <TableCell align='left'>
                        City
                    </TableCell>
                    <TableCell align='left'>
                        State
                    </TableCell>
                    <TableCell align='left'>
                        ZIP Code
                    </TableCell>
                    <TableCell align='left'>
                        Category
                    </TableCell>
                </TableRow>
                {
                    props.locationList && props.locationList.slice(1, props.locationList.length-1).map(location => 
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
                            <TableCell>
                                {location.category}
                            </TableCell>
                        </TableRow>
                    )
                }
            </Table>
        </div>
    )
}


export default AddressList;