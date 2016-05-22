const React = require('react');
const ReactDOM = require('react-dom');

var GetCities = React.createClass({
  getInitialState: function() {
    this.displayCities();
    return {
      cities: []
    };
  },

  editCity: function(id) {
    return () => {
      var holder = this.state.cities.map(function(city) {
        if(id === city._id) city.editing = true;
        return city;
      });
      this.setState({
        cities: holder
      });
    };
  },

  removeCity: function(id) {
    return () => {
      var holder = this.state.cities.filter(function(city) {
        if (id === city._id) return false;
        return true;
      });
      this.setState({
        cities: holder
      });
      $.ajax({
        url: 'http://localhost:5678/api/cities/' + id,
        type: 'DELETE'
      }).then(function(data) {
        console.log(data);
      });
    };
  },
  saveCity: function(event) {
    event.preventDefault();
    var cityData = {
      name: event.target.children['city-name'].value,
      crimeLevel: event.target.children['city-crimeLevel'].value
    };
    $.ajax({
      url: 'http://localhost:5678/api/cities/' + event.target.id,
      type: 'PUT',
      data: cityData
    }).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });

    var holder = this.state.cities.map(function(city) {
      if(city._id === event.target.id) {
        city.name = cityData.name;
        city.crimeLevel = cityData.crimeLevel;
        city.editing = false;
      }
      return city;
    });
    this.setState({
      cities: holder
    });
  },
  displayCities: function() {
    $.ajax({
      url: 'http://localhost:5678/api/cities',
      type: 'GET'
    }).then((data) => {
      data.forEach(function(city) {
        city.editing = false;
      });
      this.setState({
        cities: data
      });
    });
  },
  render: function() {
    return (
      <ol>
        { this.state.cities.map((city) => {
          return (
          <li key = { city._id } >
            <p>Name: { city.name },</p>
            <p>Crime Level: { city.crimeLevel }</p>
              <p><button onClick = { this.editCity(city._id) } > EDIT < /button>
              <button onClick = { this.removeCity(city._id) } > DELETE < /button></p>

              <form id = { city._id } className = { city.editing ? null : 'hidden' } onSubmit = { this.saveCity }>
                <input type = "text" name = "city-name" placeholder = "City Name" defaultValue = { city.name } />
                <input type = "text" name = "city-crimeLevel" placeholder = "Crime-Level" defaultValue = { city.crimeLevel } />
                <button type = "submit">SAVE CITY</button>
              </form>
            </li>
          );
        })}
      </ol>
    );
  }
});

var NewCity = React.createClass({
  createCity: function(event) {
    event.preventDefault();

    var cityData = {
      name: event.target.children['city-name'].value,
      crimeLevel: event.target.children['city-crimeLevel'].value
    };
    $.post('http://localhost:5678/api/cities', cityData, function(data) {
      console.log(data);
      document.location.reload(true);
    });
  },
  render: function() {
    return(
      <form onSubmit={this.createCity}>
        <input type="text" name="city-name" placeholder="City Name" />
        <input type="text" name="city-crimeLevel" placeholder="CrimeLevel" />
        <button type="submit">CREATE CITY</button>
      </form>
    );
  }
});
ReactDOM.render( < GetCities /> , document.getElementById('city-holder'));
ReactDOM.render( < NewCity /> , document.getElementById('newcity'));
