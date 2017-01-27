import {Fileupload} from '../../../common/AppComponents'
import React from 'react';

export default class TextElement extends React.Component {
    componentWillMount() {
        this.setTextElementState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setTextElementState(nextProps);
    }
    setTextElementState(props) {
        this.setState({
            value: props.value
        })
    }
    handleOnChange(fileId) {
        this.setState({
            value: fileId
        })
        if (this.props.onChange) {
            event.persist();
            this.props.onChange({
                target: {
                    value: fileId
                }
            }, this.props.field.name);
        }
    }
    handleOnClear() {
        this.setState({ value: null });
    }
    render() {
        return (<label className={this.props.className} for={this.props.field._id}>
            {this.props.field.name} {this.props.field.isRequired ? <span class="error">*</span> : ''}
            <Fileupload onClear={this.handleOnClear.bind(this) } value={this.state.value}
                onComplete={this.handleOnChange.bind(this) }
                name={this.props.field.name} />
        </label>)
    }
}