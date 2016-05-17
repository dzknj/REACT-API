import alt from '../alt';
import CityListActions from '../actions/CityListActions';

class CityListStore {
  constructor() {
    this.bindActions(CityListActions);
    this.cities = [];
  }

  onGetCitiesSuccess(data) {
    this.characters = data;
  }

  onGetCitiesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(CityListStore);
