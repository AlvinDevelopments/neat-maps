import React, { Component } from 'react';
import { Modal, Paper, Typography, Input, Button, Table, TableCell, TableRow, Select, MenuItem } from '@material-ui/core';
import { closeUploadModal, addNewLocation } from '../../redux/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'
import { cpus } from 'os';

class UploadMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            uploadedFile: null,
            errorMessage: '',
            locationArray: [],
            indexes: [0,1,2,3,4]
        }
    }

    handleFile = (data) => {
        this.setState({locationArray: data});
    }

    handleClose = () => {
        this.props.handleClose();
    }

    handleChangeIndex = (col, value) => {
        let { indexes } = this.state;
        indexes[col] = value;
        this.setState({indexes});
    }

    addNewLocation = () => {
        let { indexes } = this.state;
        let addressIndex = indexes.indexOf(0);
        let cityIndex = indexes.indexOf(1);
        let stateIndex = indexes.indexOf(2);
        let zipCodeIndex = indexes.indexOf(3);
        let categoryIndex = indexes.indexOf(4);

        if(indexes.length !== new Set(indexes).size) {
            this.setState({errorMessage: 'Headers cannot be duplicate'})
            return;
        }
        let locations = this.state.locationArray.map(location=>{
            return {
                address: location[addressIndex],
                city: location[cityIndex],
                state: location[stateIndex],
                zipCode: location[zipCodeIndex],
                category: location[categoryIndex],
            }
        });

        this.props.addNewLocation([{
            cityIndex: cityIndex,
            addressIndex: addressIndex,
            stateIndex: stateIndex,
            zipCodeIndex: zipCodeIndex,
            categoryIndex: categoryIndex
        }, ...locations ]);

        this.handleClose();
        this.setState({locationArray:[], errorMessage:'', page: 1, indexes: [0,1,2,3,4]})
    }

    importCsvResults = () => {
    }

    handleNextPage = () => {
        this.setState(prevState=>({page: prevState.page+1}))
    }

    handlePreviousPage = () => {
        this.setState(prevState=>({page: prevState.page-1}))
    }

    render(){
        const props  = this.props;
        return (
            <Modal
            style={{
                height:'50px',
                position:'absolute',
                top:'30%',
                left:'10%'
            }}
            onClose={this.handleClose}
            open={props.open}
            >
            {
                this.state.page === 1 ?
                <SelectCsv
                importCsvResults={this.importCsvResults}
                addNewLocation={this.addNewLocation}
                errorMessage={this.state.errorMessage}
                handleFile={(e)=>this.handleFile(e)}
                // disabled={this.state.uploadedFile == null}
                disabled={this.state.locationArray.length === 0}
                handleNextPage={this.handleNextPage}
                handlePreviousPage={this.handlePreviousPage}
                /> 
                : 
                <SetHeaders
                handleChangeIndex={this.handleChangeIndex}
                indexes={this.state.indexes}
                addNewLocation={this.addNewLocation}
                locationArray={this.state.locationArray}
                handlePreviousPage={this.handlePreviousPage}
                />
            }
            </Modal>
        )
    }
}

const SelectCsv = (props) => {
    return (
        <Paper>
            <Typography variant='h5'>
                Upload
            </Typography>
            <CSVReader
            onFileLoaded={(data)=> props.handleFile(data)}
            inputId="csv"
            // inputStyle={{color: 'grey', display:'none'}}
            />
            {props.errorMessage}
            <br/>
            You may save up to 3 csv file results at a time,
            if there's more than 3, the oldest will be overwritten!!
            <br/>
            <Button
            disabled={props.disabled}
            onClick={props.handleNextPage}
            >
                Next
            </Button>
        </Paper>
    )
};

const SetHeaders = (props) => {
    let { indexes } = props;
    return (
        <div>
            <Paper>
            Set The CSV Headers<br/>
            <Table style={{overflow:'scroll'}}>
                <TableRow>
                    <TableCell>
                        <Select 
                        value={indexes[0]}
                        onChange={(e)=>props.handleChangeIndex(0, e.target.value)}
                        >
                        <MenuItem value={0}> Address </MenuItem>
                        <MenuItem value={1}> City </MenuItem>
                        <MenuItem value={2}> State </MenuItem>
                        <MenuItem value={3}> ZIP Code </MenuItem>
                        <MenuItem value={4}> Category </MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select 
                        value={indexes[1]}
                        onChange={(e)=>props.handleChangeIndex(1, e.target.value)}
                        >
                            <MenuItem value={0}> Address </MenuItem>
                            <MenuItem value={1}> City </MenuItem>
                            <MenuItem value={2}> State </MenuItem>
                            <MenuItem value={3}> ZIP Code </MenuItem>
                            <MenuItem value={4}> Category </MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                    <Select 
                    value={indexes[2]}
                    onChange={(e)=>props.handleChangeIndex(2, e.target.value)}
                    >
                            <MenuItem value={0}> Address </MenuItem>
                            <MenuItem value={1}> City </MenuItem>
                            <MenuItem value={2}> State </MenuItem>
                            <MenuItem value={3}> ZIP Code </MenuItem>
                            <MenuItem value={4}> Category </MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select 
                        value={indexes[3]}
                        onChange={(e)=>props.handleChangeIndex(3, e.target.value)}
                        >
                            <MenuItem value={0}> Address </MenuItem>
                            <MenuItem value={1}> City </MenuItem>
                            <MenuItem value={2}> State </MenuItem>
                            <MenuItem value={3}> ZIP Code </MenuItem>
                            <MenuItem value={4}> Category </MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select 
                        value={indexes[4]}
                        onChange={(e)=>props.handleChangeIndex(4, e.target.value)}
                        >
                            <MenuItem value={0}> Address </MenuItem>
                            <MenuItem value={1}> City </MenuItem>
                            <MenuItem value={2}> State </MenuItem>
                            <MenuItem value={3}> ZIP Code </MenuItem>
                            <MenuItem value={4}> Category </MenuItem>
                        </Select>
                    </TableCell>
                </TableRow>
                {
                    props.locationArray.map(location=>
                        <TableRow>
                            {location.map(field=>
                                <TableCell align='left' >{field}</TableCell>)}
                        </TableRow>)
                }
            </Table>
            <Button onClick={props.handlePreviousPage}>
                Prev
            </Button>
            <Button
            onClick={props.addNewLocation}
            >
                Next
            </Button>
        </Paper>
        </div>
    )
}



const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    handleClose: ()=> dispatch(closeUploadModal()),
    addNewLocation: (data) => dispatch(addNewLocation(data))
})


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(UploadMenu);