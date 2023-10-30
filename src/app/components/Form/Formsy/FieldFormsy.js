import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { FormGroup, FormText, Input, Label } from 'reactstrap';
class FieldFormsy extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is passed only if the component is invalid
    const errorMessage = this.props.errorMessage;
    const { isSubmit } = this.props;
    console.log(isSubmit);
    return (
      <div className='input-row'>
        <FormGroup>
          <Label>
            {this.props.label} {this.props.isRequired ? '' : null}
          </Label>
          <Input
            onChange={this.changeValue}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value || ''}
          />
          {isSubmit ? <FormText>{errorMessage}</FormText> : ''}
        </FormGroup>
      </div>
    );
  }
}

export default withFormsy(FieldFormsy);
