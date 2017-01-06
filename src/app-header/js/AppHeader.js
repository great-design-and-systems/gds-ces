import AppInterceptor from '../../app-interceptor/AppInterceptor';
import HeaderForm from '../../header-form/js/HeaderForm';
import HeaderMenu from '../../header-menu/js/HeaderMenu';
import {View} from '../../common/AppComponents';
import { Link } from 'react-router';
import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

export default class AppHeader extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            headerForm: nextProps.headerForm
        });
    }
    render() {
        return (
            <View
                load={AppInterceptor}>
                <Sticky class="app-header">
                    <div class="top-bar" id="appHeaderId">
                        <div class="title-bar-title">
                            <Link to="/" title="LibCat">
                                <img height="50" width="50" src="src/app-header/img/libcat.png" aria-label="LibCat" />
                            </Link>
                        </div>
                        <div class="top-bar-left">
                            <HeaderForm headerForm={this.state.headerForm} />
                        </div>
                        <div class="top-bar-right">
                            <HeaderMenu />
                        </div>
                    </div>
                </Sticky>
            </View>
        );
    }
}