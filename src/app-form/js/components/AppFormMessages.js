import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect((state) => {
    return {
        validator: state.form.validator
    }
})
export default class AppFormMessages extends React.Component {
    renderMessages() {
        const messages = [];
        if (this.props.validator) {
            lodash.forIn(this.props.validator, (validator, field) => {
                if (!!validator.invalid) {
                    messages.push(<li class="error-message" name={field} key={field.hashCode()}>{validator.message}</li>);
                }
            });
        }
        return messages;
    }
    render() {
        return (<div><ul>{this.renderMessages()}</ul></div>);
    }
}