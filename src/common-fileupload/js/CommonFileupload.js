import CommonProgressbar from '../../common-progressbar/js/CommonProgressbar';
import FileUpload from 'react-fileupload';
import React from 'react';
import { UPLOAD_BASE_URL } from '../../common/AppConstants';

//TODO: progress ba
//TODO: return fileId and accept fileId as value
export default class CommonFileUpload extends React.Component {
    componentWillMount() {
        this.setState({});
    }
    constructor(props) {
        super();
        if (!props.name) {
            throw new Error('Property name is required.');
        }
        this.fileOptions = {
            baseUrl: UPLOAD_BASE_URL + '&param=userId:sample',
            fileFieldName: 'file',
            chooseFile: (files) => {
                this.setState({ files });
            },
            uploading: (progress) => {
                this.setState({
                    loaded: progress.loaded,
                    total: progress.total
                });
            },
            uploadSuccess: (res) => {
                this.setState({ fileId: res.fileId });
                if (this.props.uploadSucess) {
                    this.props.uploadSucess(res.fileId);
                }
            },
            uploadError: (res) => {
                if (this.props.uploadError) {
                    this.props.uploadError(res);
                }
            },
            uploadFail: (res) => {
                if (this.props.uploadError) {
                    this.props.uploadError(res);
                }
            }
        }
    }
    handleClearUpload() {
        this.setState({
            files: [],
            loaded: 0,
            total: 0
        });
    }
    render() {
        const hasFile = this.state.files && this.state.files.length > 0;
        const controlButton = hasFile ? <button class="button" ref="uploadBtn">upload</button> : <button class="button" ref="chooseBtn">browse</button>;
        const uploadLabel = hasFile ? <a onClick={this.handleClearUpload.bind(this)}><i class="fa fa-eraser" /></a> : <i className={this.props.labelIcon || 'fa fa-upload'} />;
        return (<div class="common-fileupload">
            <div class="input-group">
                <span class="input-group-label">{uploadLabel}</span>
                <input value={hasFile ? this.state.files[0].name : ''} readOnly placeholder="browse file" class="input-group-field" type="text" />
                <FileUpload refs={this.props.name} className={'input-group-button'} options={this.fileOptions}>
                    {controlButton}
                </FileUpload>
            </div>
            <CommonProgressbar limit={this.state.total} value={this.state.loaded} />
        </div>)
    }
}