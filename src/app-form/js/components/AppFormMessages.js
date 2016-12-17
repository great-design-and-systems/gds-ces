import React from 'react';
import lodash from 'lodash';

export default class AppFormMessages extends React.Component {
    componentWillMount() {
        if (!this.props.validator) {
            throw new Error('Property validator is required.');
        }
    }
    renderMessages() {
        const messages = [];
        lodash.forIn(this.props.validator, (validator, field) => {
            console.log('validator: ' + field, validator);
            if (validator.valid === false) {
                messages.push(<li name={field} key={field.hashCode()}>{validator.message}</li>);
            }
        });
        return messages;
    }
    render() {
        const messages = this.renderMessages();
        return (<div><ul>{messages}</ul></div>);
    }
}