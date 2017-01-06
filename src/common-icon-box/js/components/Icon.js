import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import CommonView from '../../../common-view/js/CommonView';
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
        return (<CommonView load={AppInterceptor}>
            <a title={this.state.icon} onClick={this.onIconClick.bind(this)} class="icon column">
                <i className={className} />
            </a>
        </CommonView>)
    }
}