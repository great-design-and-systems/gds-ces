import AppInterceptor from '../../app-interceptor/AppInterceptor';
import {View} from '../../common/AppComponents';
import React from 'react';
import SettingsSearchBar from '../../app-settings/js/components/SettingsSearchBar';
import { connect } from 'react-redux';

@connect(state => {
    return {
        header: state.headerForm
    }
})
export default class HeaderForm extends React.Component {
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            headerForm: nextProps.headerForm
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        let headerForm = this.state.headerForm;
        let submit = <li></li>
        if (!headerForm) {
            headerForm = <div></div>
        } else {
            submit = <li><button type="button" class="button">Search</button></li>
        }

        return (<View load={AppInterceptor}>
            <form class="header-form" name="headForm" onSubmit={this.handleSubmit.bind(this) }>
                <ul class="menu">
                    {headerForm}
                    {submit}
                </ul>
            </form>
        </View>)
    }
}