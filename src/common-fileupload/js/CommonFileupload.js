import CommonProgressbar from '../../common-progressbar/js/CommonProgressbar';
import { FILE_DOMAIN } from '../../common/AppConstants';
import FileUpload from 'react-fileupload';
import React from 'react';
import { UPLOAD_BASE_URL } from '../../common/AppConstants';
import { connect } from 'react-redux';
import { remove } from '../../api/ApiActions';

@connect()
export default class CommonFileUpload extends React.Component {
    componentWillMount() {
        this.setFileUploadState(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setFileUploadState(this.props);
        }
    }

    constructor(props) {
        super();
        if (!props.name) {
            throw new Error('Property name is required.');
        }
        this.fileOptions = {
            baseUrl: UPLOAD_BASE_URL + '&param=userId:sample',
            fileFieldName: 'file',
            accept: props.accept || '*/*',
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
                this.setState({ fileId: res.fileId, uploading: false });
                if (this.props.uploadSucess) {
                    this.props.uploadSucess(res.fileId);
                }
            },
            uploadError: (res) => {
                if (this.props.uploadError) {
                    this.props.uploadError(res);
                }
                this.setState({
                    uploading: false
                });
            },
            uploadFail: (res) => {
                if (this.props.uploadError) {
                    this.props.uploadError(res);
                }
                this.setState({
                    uploading: false
                });
            },
            beforeUpload: () => {
                if (this.state.fileId) {
                    this.props.dispatch(remove('{' + FILE_DOMAIN + '.deleteFile}', {
                        fileId: this.state.fileId
                    }));
                }
                this.setState({ fileId: null, uploading: true });
                return true;
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
    setFileUploadState(props) {
        this.setState({ fileId: props.value });
    }
    render() {
        const className = 'common-fileupload ' + this.props.className || '';
        const hasFile = this.state.files && this.state.files.length > 0;
        const controlButton = hasFile ? <button class="button" ref="uploadBtn">upload</button> : <button class="button" ref="chooseBtn">browse</button>;
        const uploadLabel = hasFile ? <a onClick={this.handleClearUpload.bind(this)}><i class="fa fa-eraser" /></a> : <i className={this.props.labelIcon || 'fa fa-upload'} />;
        const input = !this.state.uploading ? <input value={hasFile ? this.state.files[0].name : ''} readOnly placeholder="browse file" class="input-group-field" type="text" /> :
            <CommonProgressbar className={'input-group-field'} limit={this.state.total} value={this.state.loaded} />;

        return (<div className={className}>
            <div class="input-group">
                <span class="input-group-label">{uploadLabel}</span>
                {input}
                <FileUpload refs={this.props.name} className={'input-group-button'} options={this.fileOptions}>
                    {controlButton}
                </FileUpload>
            </div>
        </div>)
    }
}