import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Test = ({}) => {

    return (
        <> 
        <h1> TEST </h1>
        </>
    );
};

export default connect(
    state => ({}),
    dispatch => ({}),
    )(Test);