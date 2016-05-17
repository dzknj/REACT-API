import alt from '../alt';

class AddCityActions {
  constructor() {
    this.generateActions(
      'addCitySuccess',
      'addCityFail',
      'updateName',
      'updatecrimeLevel',
      'invalidName',
      'invalidcrimeLevel'
    );
  }

  addCity(name, crimeLevel) {
    $.ajax({
      type: 'POST',
      url: '/api/cities',
      data: { name: name, crimeLevel: crimeLevel }
    })
      .done((data) => {
        this.actions.addCitySuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addCityFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddCityActions);
