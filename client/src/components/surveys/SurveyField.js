/**
 * @file
 *
 * SurveyField contains logic to render a single
 * label and text input.
 */
import React from 'react';

// The Field component from reduxForm provides us with extra props.
// ES6 destructuring... pulling props.input off the props object.
// Eg, event handlers: onBlur, onChange etc.
// ALSO es6 NESTED destructuring of the 'meta prop'
const SurveyField = ({ input, label, meta: { error, touched } }) => {
  //console.log('meta', meta);
  return (
    <div>
      <label>{label}</label>
      {/* JSX using rest operator to add all the event handlers in one hit.
         instead of doing onChange=input.onChange, onBlur=input.onBlur etc */}
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
}

export default SurveyField;