import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getOneCity();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character) {
    var winner = city.name;
  }

  render() {
    var cityNodes = this.state.cities.map((city, index) => {
      return (
        <div key={city.name} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong>Crime Level:</strong> {city.crimeLevel}</li>
              </ul>
              <h4>
                <Link to={'/cities/' + city.name}><strong>{city.name}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>Do not click the city. The functionality, it is not done yet.</h3>
        <div className='row'>
          {cityNodes}
        </div>
      </div>
    );
  }
}

export default Home;
