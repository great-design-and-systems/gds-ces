import React from 'react';

export default class CommonBody extends React.Component {
    componentWillMount() {
        this.setState({});
    }
    componentDidMount(x, y, z) {
        this.setState({ height: window.innerHeight + 'px' });
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
