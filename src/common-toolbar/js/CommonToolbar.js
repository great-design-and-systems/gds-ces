import AppInterceptor from '../../app-interceptor/AppInterceptor';
import CommonView from '../../common-view/js/CommonView';
import React from 'react';
import ToolbarButton from './components/ToolbarButton';
import { wrapComponent } from '../../common/AppUtils';

export default class CommonToolbar extends React.Component {
    constructor(props) {
        super();
        if (!props.controls) {
            throw new Error('Property "controls" is required');
        }
    }
    componentWillMount() {
        if (this.props.controls) {
            const buttons = [];
            this.props.controls.forEach(control => {
                buttons.push(<ToolbarButton key={control.name.hashCode()} control={control}
                    action={this.handleAction.bind(this)} />)
            });
            this.setState({ controls: buttons });
        } else {
            this.setState({});
        }
    }
    handleAction(event, name, dispatch) {
        if (this.props.onClick) {
            this.props.onClick(event, name, dispatch);
        }
    }
    render() {
        let className = 'button-group';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (<CommonView load={AppInterceptor}>
            <div className={className}>
                {this.state.controls}
            </div>
        </CommonView>)
    }
}