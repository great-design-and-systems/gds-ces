import React from 'react';
import { connect } from 'react-redux';
import { reloaded } from './CommonViewActions';

@connect(state => {
    return {
        view: state.view
    }
})
export default class CommonView extends React.Component {
    componentWillMount() {
        this.reloadView(this.props);
        this.setState({ rendered: true });
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
        }
        if (nextProp.if != null) {
            this.setState({ rendered: nextProp.if });
        }
    }
    done() {
        this.setState({ visible: true });
        this.props.dispatch(reloaded());
    }
    render() {
        if (!this.state.rendered) return <span></span>;
        if (!this.state.visible) return (<div class="view-waiting"><i class="fa fa-spin fa-spinner" /></div>);
        return this.props.children;
    }
} 