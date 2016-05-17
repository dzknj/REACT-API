import React from 'react';
import AddCityStore from '../stores/AddCityStore';
import AddCityActions from '../actions/AddCityActions';

class AddCity extends React.Component {

  constructor(props) {
    super(props);
    this.state = AddCityStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddCityStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddCityStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var crimeLevel = this.state.crimeLevel;

    if (!name) {
      AddCityActions.invalidName();
      this.refs.nameTextField.getDOMNode().focus();
    }

    if (!crimeLevel) {
      AddCityActions.invalidcrimeLevel();
    }

    if (name && crimeLevel) {
      AddCityActions.addCity(name, crimeLevel);
    }
  }

  render() {
    return (
      <div className='container'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add City</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>City Name</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                           onChange={AddCityActions.updateName} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.crimeLevelValidationState}>
                    <div className='radio radio-inline'>
                    <label>Crime-Level</label>
                      <input type='radio' name='crimeLevel' id='high' value='high' checked={this.state.crimeLevel === 'high'}
                             onChange={AddCityActions.updatecrimeLevel}/>
                      <label htmlFor='high'>high</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='crimeLevel' id='low' value='low' checked={this.state.crimeLevel === 'low'}
                             onChange={AddCityActions.updatecrimeLevel}/>
                      <label htmlFor='low'>low</label>
                    </div>
                    <h2>{this.state.name}</h2>
                    <h3>{this.state.crimeLevel}</h3>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
      </div>
    );
  }
}

export default AddCity;
