import { get, remove } from '../../api/ApiActions';

import CommonProgressbar from '../../common-progressbar/js/CommonProgressbar';
import { FILE_DOMAIN } from '../../common/AppConstants';
import FileUpload from 'react-fileupload';
import React from 'react';
import { UPLOAD_BASE_URL } from '../../common/AppConstants';
import { connect } from 'react-redux';
import { isApiActionDone } from '../../common/AppUtils';

const ACTION_GET_FILE_DETAIL_BY_ID = '{' + FILE_DOMAIN + '.getFileDetailById}';
@connect(state => {
    return {
        api: state.api
    }
})
export default class CommonFileUpload extends React.Component {
    componentWillUnmount() {
        this.setState({});
    }

    componentWillMount() {
        this.setFileUploadState(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setFileUploadState(this.props);
        } else if (!this.props.api.pending && isApiActionDone(this.props.api, ACTION_GET_FILE_DETAIL_BY_ID) && !this.loaded) {
            if (!this.props.api[FILE_DOMAIN].error) {
                const fileDetail = this.props.api[FILE_DOMAIN]['getFileDetailById'].data.data;
                this.setState({ fileDetail });
            }
            this.loaded = true;
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
                if (this.props.onSelect) {
                    this.props.onSelect(files);
                }
            },
            uploading: (progress) => {
                this.setState({
                    loaded: progress.loaded,
                    total: progress.total
                });
            },
            uploadSuccess: (res) => {
                this.setState({ fileId: res.fileId, uploading: false });
                if (this.props.onComplete) {
                    this.props.onComplete(res.fileId);
                }
            },
            uploadError: (res) => {
                if (this.props.onFail) {
                    this.props.onFail(res);
                }
                this.setState({
                    uploading: false
                });
            },
            uploadFail: (res) => {
                if (this.props.onFail) {
                    this.props.onFail(res);
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
        if (this.props.onClear) {
            this.props.onClear();
        }
    }
    setFileUploadState(props) {
        if (props.value) {
            this.loaded = false;
            props.dispatch(get(ACTION_GET_FILE_DETAIL_BY_ID, {
                fileId: this.props.value
            }));
        }
        this.setState({ fileId: props.value });
    }
    render() {
        const className = 'common-fileupload ' + (this.props.className || '');
        const hasFile = this.state.files && this.state.files.length > 0;
        const controlButton = hasFile ? <button disabled={this.props.disabled} class="button" type="button" ref="uploadBtn">upload</button> : <button disabled={this.props.disabled} type="button" class="button" ref="chooseBtn">browse</button>;
        const uploadLabel = hasFile ? <a onClick={this.handleClearUpload.bind(this)}><i class="fa fa-eraser" /></a> : <i className={this.props.labelIcon || 'fa fa-upload'} />;
        const input = !this.state.uploading ? <input value={hasFile ? this.state.files[0].name : this.state.fileDetail ? this.state.fileDetail.fileName : ''} readOnly placeholder="browse file" class="input-group-field" type="text" /> :
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