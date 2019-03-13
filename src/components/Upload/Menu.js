import React, { Component } from 'react';
import { Modal, Paper, Typography, Input, Button, Table, TableCell, TableRow, Select, MenuItem } from '@material-ui/core';
import { closeUploadModal, addNewLocation } from '../../redux/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'

class UploadMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            errorMessage: '',
            locationArray: [],
            indexes: [0,1,2,3,4]
        }
    }

    handleFile = (data) => {
        this.setState({locationArray: data});

        if(data.length === 0){
            this.setState({errorMessage:'csv cannot be empty', page: 1})
        } else {
            this.setState({errorMessage: '', page: 2});
        }
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

        this.props.addNewLocation(locations);

        this.handleClose();
        this.setState({locationArray:[], errorMessage:'', page: 1, indexes: [0,1,2,3,4]})
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
                width:'800px',
                height:'900px',
                margin: 'auto auto',
            }}
            open={props.open}
            >
                <React.Fragment>
                    <Button
                    style={{
                        position:'absolute',
                        right:'0'
                    }}
                    onClick={this.handleClose}
                    >
                        Close
                    </Button>
                    <Paper style={{padding:'25px 0px'}} >
                    {
                        this.state.page === 1 ?
                        <SelectCsv
                        importCsvResults={this.importCsvResults}
                        addNewLocation={this.addNewLocation}
                        errorMessage={this.state.errorMessage}
                        handleFile={(e)=>this.handleFile(e)}
                        disabled={this.state.locationArray.length === 0}
                        handleNextPage={this.handleNextPage}
                        handlePreviousPage={this.handlePreviousPage}
                        /> 
                        :
                        <SetHeaders
                        // errorMessage={this.error}
                        handleChangeIndex={this.handleChangeIndex}
                        indexes={this.state.indexes}
                        addNewLocation={this.addNewLocation}
                        locationArray={this.state.locationArray}
                        handlePreviousPage={this.handlePreviousPage}
                        />
                    }
                    </Paper>
                </React.Fragment>
            </Modal>
        )
    }
}

const SelectCsv = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
            <Typography variant='h5'>
                Upload CSV
            </Typography>
            <CSVReader
            inputStyle={{ display: 'none'}}
            onFileLoaded={(data)=> props.handleFile(data)}
            inputId="csv"
            />
            <Button variant='contained' onClick={()=>document.getElementById('csv').click()}>
                Select CSV File
            </Button>
            {props.errorMessage}
            <br/>
        </div>
    )
};

const HeaderSelect = ({indexes, col, handleChangeIndex}) => {
    return (
        <Select 
        value={indexes[col]}
        onChange={(e)=>handleChangeIndex(col, e.target.value)}
        >
            <MenuItem value={0}> Address </MenuItem>
            <MenuItem value={1}> City </MenuItem>
            <MenuItem value={2}> State </MenuItem>
            <MenuItem value={3}> ZIP Code </MenuItem>
            <MenuItem value={4}> Category </MenuItem>
        </Select>
    )
}

const SetHeaders = (props) => {
    let { indexes } = props;
    return (
        <div>
            <Typography variant='h5'>
                Set The CSV Headers
            </Typography>
        <div
        style={{
            height: '300px',
            overflow:'scroll'
        }}>
            <Table>
                <TableRow>
                    <TableCell>
                        <HeaderSelect 
                        indexes={indexes}
                        col={0}
                        handleChangeIndex={props.handleChangeIndex}
                        />
                    </TableCell>
                    <TableCell>
                        <HeaderSelect 
                        indexes={indexes}
                        col={1}
                        handleChangeIndex={props.handleChangeIndex}
                        />
                    </TableCell>
                    <TableCell>
                        <HeaderSelect 
                        indexes={indexes}
                        col={2}
                        handleChangeIndex={props.handleChangeIndex}
                        />
                    </TableCell>
                    <TableCell>
                        <HeaderSelect 
                        indexes={indexes}
                        col={3}
                        handleChangeIndex={props.handleChangeIndex}
                        />
                    </TableCell>
                    <TableCell>
                        <HeaderSelect 
                        indexes={indexes}
                        col={4}
                        handleChangeIndex={props.handleChangeIndex}
                        />
                    </TableCell>
                </TableRow>
                {
                    props.locationArray.map(location=>
                        <TableRow>
                            {location.map(field=>
                                <TableCell align='left' > { field } </TableCell>)}
                        </TableRow>)
                }
            </Table>
            </div>
            <Button onClick={props.handlePreviousPage}>
                Prev
            </Button>
            <Button
            onClick={props.addNewLocation}
            >
                Next
            </Button>
            {props.errorMessage}
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