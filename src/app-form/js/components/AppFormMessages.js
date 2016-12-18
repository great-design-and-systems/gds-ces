import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect((state) => {
    return {
        error: state.form.error || state.api.error
    }
})
export default class AppFormMessages extends React.Component {
    renderMessages() {
        const messages = [];
        if (this.props.error) {
            lodash.forIn(this.props.error, (error, field) => {
                lodash.forIn(error, (validator, fieldValidator) => {
                    if (!!validator.invalid) {
                        let className = 'form-message';
                        if (validator.type) {
                            className += ' ' + validator.type;
                        } else {
                            className += ' alert';
                        }
                        messages.push(<li class={className} name={fieldValidator} key={fieldValidator.hashCode()}>{validator.message}</li>);
                    }
                });
            });
        }
        return messages;
    }
    render() {
        return (<div><ul>{this.renderMessages()}</ul></div>);
    }
}