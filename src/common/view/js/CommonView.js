import Loading from 'react-loading';
import React from 'react';
import { getRandomColor } from '../../AppUtils';
import { reloaded } from './CommonViewActions';

export default class CommonView extends React.Component {
    componentWillMount() {
        this.reloadView(this.props);
        if (this.props.if != null) {
            this.setState({ rendered: this.props.if });
        } else {
            this.setState({ rendered: true });
        }
    }
    reloadView(props) {
        this.setState({ visible: !props.load });
        if (props.load) {
            props.load(this.done.bind(this), props.context);
        }
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.if != null) {
            this.setState({ rendered: nextProp.if });
        }
    }
    done() {
        this.setState({ visible: true });
    }
    render() {
        if (!this.state.rendered) return <span></span>;
        if (!this.state.visible) return (<Loading type="bubbles" color={getRandomColor()} />);
        return this.props.children;
    }
} 