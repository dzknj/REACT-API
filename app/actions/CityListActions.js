import alt from '../alt';

class CityListActions {
  constructor() {
    this.generateActions(
      'getCitiesSuccess',
      'getCitiesFail'
    );
  }

  getCities(payload) {
    let url = '/api/cities/list';
    let params = {
      name: payload.name,
      crimeLevel: payload.crimeLevel
    };

    if (payload.category === 'high') {
      params.crimeLevel = 'high';
    } else if (payload.category === 'low') {
      params.crimeLevel = 'low';
    }

    $.ajax({ url: url, data: params })
      .done((data) => {
        this.actions.getCitiesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCitiesFail(jqXhr);
      });
  }
}

export default alt.createActions(CityListActions);
