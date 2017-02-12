import AppInterceptor from '../../../app/-interceptor/AppInterceptor';
import CommonView from '../../view/js/CommonView';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect(state => {
    return { messages: state.messages };
})
export default class CommonMessages extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({
            messages: []
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.errors.length) {
            const messages = [];
            nextProps.messages.errors.forEach(errors => {
                lodash.forIn(errors, (error, field) => {
                    lodash.forIn(error, (validator, fieldValidator) => {
                        if (!!validator.invalid) {
                            let className = 'common-message';
                            if (validator.type) {
                                className += ' ' + validator.type;
                            } else {
                                className += ' alert';
                            }
                            messages.push(<div class={className} name={fieldValidator} key={fieldValidator.hashCode()}>{validator.message ? validator.message : 'An error has occured.'}</div>);
                        }
                    });
                });
            });
            this.setState({ messages });
        } else {
            this.setState({
                messages: []
            })
        }
    }
    render() {
        let className = 'common-messages';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (<CommonView if={this.state.messages.length} load={AppInterceptor}><div className={className}></div></CommonView>)
    }
}