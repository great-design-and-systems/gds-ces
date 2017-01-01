import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
import React from 'react';
import { connect } from 'react-redux';

export default class AppContent extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <div></div>
            </Intercept>)
    }
}