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
                        let className = 'form-message row expanded';
                        if (validator.type) {
                            className += ' ' + validator.type;
                        } else {
                            className += ' alert';
                        }
                        messages.push(<div class={className} name={field + '_' + fieldValidator} key={(field + '_' + fieldValidator).hashCode()}>{validator.message ? validator.message : 'An error has occured.'}</div>);
                    }
                });
            });
        }
        return messages;
    }
    render() {
        return (<div>{this.renderMessages()}</div>);
    }
}