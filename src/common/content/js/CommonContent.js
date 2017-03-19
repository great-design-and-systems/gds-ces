import Loading from 'react-loading';
import React from 'react';
import { getRandomColor } from '../../AppUtils';
import {connect} from 'react-redux';
@connect(state=> {
    return {
        body: state.body
    }
})
export default class CommonContent extends React.Component {

    componentWillMount() {
        this.setState({
            loading: this.props.loading || false
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading !== this.props.loading) {
            this.setState({
                loading: this.props.loading
            })
        }
        if (prevProps.body.height !== this.props.body.height) {
            this.setState({
                height: (this.props.body.height - 27) + 'px'
            })
        }
        if (prevProps.body.width !== this.props.body.width) {
            this.setState({
                width: (this.props.body.width) + 'px'
            })
        }

    }

    render() {
        let className = 'common-content column';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (
            <div id={this.props.id} className={className} style={{height:this.state.height, width: this.state.width}}>
                {!this.state.loading ? this.props.children : <Loading type="bubbles" color={getRandomColor()}/>}
            </div>);
    }
}