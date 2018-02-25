/**
 * @file
 *
 * SurveyNew shows SurveyForm and SurveyFormReview.
 */
import React, { Component } from 'react';
import  { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

  // Classic constructor required to intialise class member vars.
  // constructor() {
  //   super(props);
  //
  //   this.state = { showReview: false };
  // }

  // Shorthand can be used to initialise class member vars since
  // we are using create-react-app and Babel has been configured to transpile
  // this proposed ES6 functionality.
  // Typescript would also work here just fine...
  state = { showReview: false };

  renderContent() {
    if (this.state.showReview) {
      return <SurveyFormReview onCancel={() => this.setState({ showReview: false })} />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

// Awesome redux form feature.
// We set destroyOnUnmount = false on the SurveyForm component.
// This ensures the form values persist for that form, even if the component is destroyed
// when navigating to the form review page.
// However by NOT setting it here, we make sure the form values ARE destroyed
// when THIS component is destroyed.
// That we we keep our state between the form and form review pages,
// but correctly clear the state when the user clicks cancel or navigates away.
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);