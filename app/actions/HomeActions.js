import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getOneCitySuccess',
      'getOneCityFail',
      'voteFail'
    );
  }

  getOneCity() {
    $.ajax({ url: '/api/cities' })
      .done(data => {
        this.actions.getOneCitySuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getOneCityFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);
