import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav';
import { Button, Snackbar } from '@material-ui/core';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import MainPage from './page/Main/MainPage';
import LoginPage from './page/Login/LoginPage';
import UploadMenu from './components/Upload/Menu';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { signOut } from './redux/actions';


const Screen = (props) => {
  return (
    <div style={{
      padding: '0px 2%'
    }}>
      { props.children }
    </div>
  )
}
class App extends Component {

  render() {
    return (
      <div className="App">
        <Nav>
          <Button 
          style={{
            display: this.props.userAccount == null ? 'none' : 'inline'
          }}
          onClick={()=>{
            this.props.signOut();
            window.location.reload();
          }}>
              Logout
          </Button>
        </Nav>
        <UploadMenu open={this.props.uploadModal}/>
        <Screen>
          <Switch>
            <Route exact path='/login' render={()=> this.props.userAccount != null ? <Redirect to={{pathname:'/main'}}/> : <LoginPage/>}/>
            <Route exact path ='/' component={()=>(<Redirect to={{pathname:'/main'}}/>)}/>
            <PrivateRoute 
            authed={this.props.userAccount != null} 
            exact path='/main' component={MainPage}/>
          </Switch>
        </Screen>
        <Snackbar 
        open={this.props.errorMessage !== ''} 
        message={this.props.errorMessage}/>
      </div>
    );
  }
}

const PrivateRoute = (props) => (
  <Route
  render={
    () =>
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
  errorMessage: state.globalError.errorMessage,
  userAccount: state.userAccount,
  uploadModal: state.uploadModal.isOpen
})

const mapDispatchToProps = (dispatch) =>  ({
  signOut: () => dispatch(signOut())
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
