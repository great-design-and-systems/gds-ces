import Loading from 'react-loading';
import React from 'react';
import { getRandomColor } from '../../common/AppUtils';

export default class CommonContent extends React.Component {

    componentWillMount() {
        this.setState({
            loading: this.props.loading || false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading !== this.props.loading) {
            this.setState({
                loading: this.props.loading
            })
        }
    }

    render() {
        let className = 'common-content column';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (<div id={this.props.id} className={className}>
            {!this.state.loading ? this.props.children : <Loading type="bubbles" color={getRandomColor()} />}
        </div>);
    }
}