import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import CityListStore from '../stores/CityListStore';
import CityListActions from '../actions/CityListActions';

class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = CityListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CityListStore.listen(this.onChange);
    CityListActions.getCities(this.props.params);
  }

  componentWillUnmount() {
    CityListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      CityListActions.getCities(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let cityList = this.state.cities.map((city, index) => {
      return (
        <div key={city.name} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <ul className='list-inline'>
                <li><strong>Crime:</strong> {city.crimeLevel}</li>
                <li><strong>Name:</strong> {city.name}</li>
              </ul>
              <h4>
                <Link to={'/cities/' + city.name}><strong>{city.name}</strong></Link>
              </h4>
            // <div className='pull-left thumb-lg'>
            //   <Link to={'/cities/' + city.name}>
            //   </Link>
            // </div>
            // <div className='media-body'>
            //   <h4 className='media-heading'>
            //     <Link to={'/cities/' + city.name}>{city.name}</Link>
            //   </h4>
            //   <small>Crime-Level: <strong>{city.crimeLevel}</strong></small>
            //   <br />
            // </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {cityList}
        </div>
      </div>
    );
  }
}

export default CityList;
