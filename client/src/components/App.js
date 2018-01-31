import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {

  // React lifecycle method.
  componentDidMount() {

    // Call the FETCH_USER actions creator.
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route path="/surveys/new" component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// Note: This will assign all of our action creators as 'props' on the App component.
export default connect(null, actions)(App);