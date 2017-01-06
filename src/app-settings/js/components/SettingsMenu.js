import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import {View} from '../../../common/AppComponents';
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';

export default class SettingsMenu extends React.Component {
    render() {
        return (<View load={AppInterceptor}><li><Link to="/settings"> <i class="fa fa-gears" /> Settings </Link></li></View>);
    }
}