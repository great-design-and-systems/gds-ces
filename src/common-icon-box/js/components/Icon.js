import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Intercept from '../../../common-view/js/Intercept';
import React from 'react';

export default class Icon extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            icon: nextProps.icon
        });
    }
    onIconClick(event) {
        if (this.props.handleSelect) {
            this.props.handleSelect(this.props.icon);
        }
    }
    render() {
        let className = this.state.icon;
        if (className) {
            className += ' fa-fw fa-3x';
        }
        return (<Intercept load={AppInterceptor}>
            <a title={this.state.icon} onClick={this.onIconClick.bind(this)} class="icon column">
                <i className={className} />
            </a>
        </Intercept>)
    }
}