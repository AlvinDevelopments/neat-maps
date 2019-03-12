import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav';
import { Button } from '@material-ui/core';
import { Redirect, Switch, Route } from 'react-router-dom';
import MainPage from './page/Main/MainPage';
import LoginPage from './page/Login/LoginPage';
import UploadMenu from './components/Upload/Menu';
import { compose } from 'recompose';
import { connect } from 'react-redux';


class App extends Component {

  render() {
    return (
      <div className="App">
      <Nav>
        <Button>
            Logout
        </Button>
      </Nav>
      <UploadMenu open={this.props.uploadModal}/>
      <Switch>
        <Route exact path ='/' component={()=>(<Redirect to={{pathname:'/main'}}/>)}/>
        <Route exact path='/main' component={MainPage}/>
        <Route exact authed={false} path='/login' component={LoginPage}/>
      </Switch>
      </div>
    );
  }
}

const PrivateRoute = ({ ...props}) => (
  <Route
  render={
    props =>
     props.authed ?
      <MainPage {...props} />
      :
      <Redirect
      to={{
        pathname:'/login'
      }} 
      />
  }
  />
)

const mapStateToProps = (state) => ({
  uploadModal: state.uploadModal.isOpen
})

export default compose(
  connect(
    mapStateToProps
  )
)(App);
