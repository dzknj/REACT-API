import alt from '../alt';
import AddCityActions from '../actions/AddCityActions';

class AddCityStore {
  constructor() {
    this.bindActions(AddCityActions);
    this.name = '';
    this.crimeLevel = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.crimeLevelValidationState = '';
  }

  onAddCitySuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddCityFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdatecrimeLevel(event) {
    this.crimeLevel = event.target.value;
    this.crimeLevelValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a city name.';
  }

  onInvalidcrimeLevel() {
    this.crimeLevelValidationState = 'has-error';
  }
}

export default alt.createStore(AddCityStore);
