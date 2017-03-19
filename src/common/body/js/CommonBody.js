import React from 'react';
import {connect} from 'react-redux';
import {setBodyHeight, setBodyWidth, setScreenSize} from './CommonBodyActions';
@connect()
export default class CommonBody extends React.Component {
    componentWillMount() {
        this.setState({});
    }

    componentDidMount(x, y, z) {
        window.onresize = ()=> {
            this.setState({height: window.innerHeight + 'px'});
            this.props.dispatch(setBodyHeight(window.innerHeight));
            this.props.dispatch(setBodyWidth(window.innerWidth));
        };
        $(window).unbind('changed.zf.mediaquery');
        $(window).on('changed.zf.mediaquery', (event, newSize) => {
            this.props.dispatch(setScreenSize(newSize));
        });
        this.setState({height: window.innerHeight + 'px'});
        this.props.dispatch(setBodyHeight(window.innerHeight));
        this.props.dispatch(setBodyWidth(window.innerWidth));
        this.props.dispatch(setScreenSize(Foundation.MediaQuery.current));
    }

    render() {
        let className = 'common-body row expanded';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (<div id={this.props.id} style={{ height: this.state.height }} className={className}>
            {this.props.children}
        </div>);
    }
}
