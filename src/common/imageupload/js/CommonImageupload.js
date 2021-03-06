import CommonFileupload from '../../fileupload/js/CommonFileupload';
import CommonImageviewer from '../../imageviewer/js/CommonImageviewer';
import { READ_FILE } from '../../AppConstants';
import React from 'react';

//TODO: image preview before upload
//TODO: show fileId data on upload complete
export default class CommonImageupload extends React.Component {
    componentWillUnmount() {
        this.setState({});
    }
    componentWillMount() {
        this.setImageuploadState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setImageuploadState(nextProps);
        }
    }
    constructor(props) {
        super();
        if (!props.name) {
            throw new Error('Property name is required.');
        }
    }
    setImageuploadState(props) {
        this.setState({ value: props.value });
    }
    handleOnComplete(fileId) {
        this.setState({ value: fileId, file: null });
        if (this.props.onChange) {
            this.props.onChange(fileId);
        }
    }
    handleOnSelect(files) {
        if (files) {
            this.setState({
                file: files[0],
                value: null
            })
        } else {
            this.setState({ file: null });
        }
    }
    handleOnClear() {
        this.setState({
            file: null,
            value: null
        });
    }
    render() {
        return (<div className={'common-imageupload ' + (this.props.className || '')}>
            <div class="image-div">
                <CommonImageviewer fileId={this.state.value} file={this.state.file} />
            </div>
            <div>
                <CommonFileupload disabled={this.props.disabled} onClear={this.handleOnClear.bind(this)} value={this.state.value}
                    onSelect={this.handleOnSelect.bind(this)} onComplete={this.handleOnComplete.bind(this)}
                    name={this.props.name} accept="image/*" />
            </div>
        </div>)
    }
}