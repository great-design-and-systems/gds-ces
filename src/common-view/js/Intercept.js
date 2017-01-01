import React from 'react';
import { connect } from 'react-redux';
import { reloaded } from './CommonViewActions';

@connect(state => {
    return {
        view: state.view
    }
})
export default class Intercept extends React.Component {
    componentWillMount() {
        this.reloadView(this.props);
    }
    reloadView(props) {
        this.setState({ visible: !props.load });
        if (props.load) {
            props.load(this.done.bind(this), props.context);
        }
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.view.reload) {
            this.reloadView(nextProp);
        } else {

        }
    }
    done() {
        this.setState({ visible: true });
        this.props.dispatch(reloaded());
    }
    render() {
        if (!this.state.visible) return (<div class="view-waiting"><i class="fa fa-spin fa-spinner" /></div>);
        return this.props.children;
    }
} 