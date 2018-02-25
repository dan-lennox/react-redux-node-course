/**
 * @file
 *
 * SurveyFormReview shows users their form inputs for review.
 */
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

// The 'submitSurvey' prop is coming via our 'actions' object.
// redux connect has wired this up as a prop ready for use when
// we called connect().
const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {

  // An array of JSX.
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>

      {reviewFields}

      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>

      <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return { formValues: form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);