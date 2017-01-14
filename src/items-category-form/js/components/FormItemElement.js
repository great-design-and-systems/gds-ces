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

    handleOnChange(event) {
        this.setState({
            value: event.target.value
        })
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event);
        }
    }
    createFormElement(props) {
        const field = props.field;
        let formElement;
        switch (field.fieldType) {
            case 'text':
                formElement = <TextElement className={'column large-4 medium-6 small-12'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
            case 'boolean':
                formElement = <div class="column"></div>
                break;
            case 'date':
                formElement = <div class="column"></div>
                break;
            case 'number':
                formElement = <NumberElement className={'column'} field={field} onChange={this.handleOnChange.bind(this)} value={this.state.value} />
                break;
        }
        return formElement;
    }
    render() {
        return this.createFormElement(this.props);
    }
}