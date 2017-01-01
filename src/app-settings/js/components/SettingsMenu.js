import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Intercept from '../../../common-view/js/Intercept';
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';

export default class SettingsMenu extends React.Component {
    render() {
        return (<Intercept load={AppInterceptor}><li><Link to="settings"> <i class="fa fa-gears" /> Settings </Link></li></Intercept>);
    }
}