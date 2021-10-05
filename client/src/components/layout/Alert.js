import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Alert = ({ alert: { alerts, sent } }) => {
  return (
    alerts !== null &&
    sent === false &&
    alerts.map(item => (
      <div key={item.id} className={`alert alert-${item.alertType} mb-4`}>
        {item.msg}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
