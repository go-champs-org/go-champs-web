import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../store';

class PhaseDefaultHome extends React.Component {
  render() {
    console.log('default phase carregado', this.props);
    return <div>PhaseDefaultHome</div>;
  }
}

const mapStateToProps = (state: StoreState) => ({
  tournaments: state.tournaments
});

export default connect(mapStateToProps)(PhaseDefaultHome);
