import  CommonFileUpload  from '../../../fileupload/js/CommonFileupload';
import React from 'react';

export default class DocumentElement extends React.Component {
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
        });
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    value: fileId
                }
            }, this.props.field.name);
        }
    }

    handleOnClear() {
        this.setState({value: null});
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    value: null
                }
            }, this.props.field.name);
        }
    }

    render() {
        return (<label className={this.props.className} for={this.props.field._id}>
            {this.props.field.name} {this.props.field.isRequired ? <span class="error">*</span> : ''}
            <CommonFileUpload onClear={this.handleOnClear.bind(this)} value={this.state.value}
                              onComplete={this.handleOnChange.bind(this)}
                              name={this.props.field.name}/>
        </label>)
    }
}