import BooleanElement from './BooleanElement';
import DateElement from './DateElement';
import NumberElement from './NumberElement';
import React from 'react';
import TextElement from './TextElement';

export default class FormItemElement extends React.Component {
    componentWillMount() {
        this.setState({
            value: this.props.value
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    handleOnChange(event, fieldName) {
        this.setState({
            value: event.target.value
        })
        if (this.props.onChange) {
            if (event.persist) {
                event.persist();
            }
            this.props.onChange(event, fieldName);
        }
    }
    createFormElement(props) {
        const field = props.field;
        let formElement;
        switch (field.fieldType) {
            case 'text':
                formElement = <TextElement className={'column large-4 medium-6 small-12 end'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
            case 'boolean':
                formElement = <BooleanElement className={'column large-4 medium-6 small-12 end'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
            case 'date':
                formElement = <DateElement className={'column large-4 medium-6 small-12 end'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
            case 'number':
                formElement = <NumberElement className={'column large-4 medium-6 small-12 end'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
        }
        return formElement;
    }
    render() {
        return this.createFormElement(this.props);
    }
}