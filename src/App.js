import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/SimpleAction'

import NoUser from './pages/nouser/'
import Admin from './pages/admin/'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }
  render() {
    return (
      <Router>
        {
          (() => {
            switch(this.props.loginReducer.UserRole){
              case 'Admin':
                return (<Route path="/" component={Admin} />)
              default:
                return (<Route path="/" component={NoUser} />)
            }
          })()
        }
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);