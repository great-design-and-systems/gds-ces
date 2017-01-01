import AppInterceptor from '../../app-interceptor/AppInterceptor';
import HeaderForm from '../../header-form/js/HeaderForm';
import HeaderMenu from '../../header-menu/js/HeaderMenu';
import Intercept from '../../common-view/js/Intercept';
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
            <Intercept
                load={AppInterceptor}>
                <Sticky class="app-header top-bar">
                    <div class="top-bar-title">
                        <a href="#/" title="LibCat">
                            <img height="50" width="50" src="src/app-header/img/libcat.png" aria-label="LibCat" />
                        </a>
                    </div>
                    <div>
                        <div class="top-bar-left">
                            <HeaderForm headerForm={this.state.headerForm} />
                        </div>
                        <div class="top-bar-right">
                            <HeaderMenu />
                        </div>
                    </div>
                </Sticky>
            </Intercept>
        );
    }
}