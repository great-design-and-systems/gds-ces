import CommonFileupload from '../../common-fileupload/js/CommonFileupload';
import { READ_FILE } from '../../common/AppConstants';
import React from 'react';

//TODO: image preview before upload
//TODO: show fileId data on upload complete
export default class CommonImageupload extends React.Component {
    componentWillMount() {
        this.setImageuploadState(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setImageuploadState(this.props);
        }
    }
    constructor(props) {
        super();
        if (!props.name) {
            throw new Error('Property name is required.');
        }
        this.imageProps = {
            height: 175,
            width: 230
        }
    }
    setImageuploadState(props) {
        this.setState({ value: props.value, _d: new Date().getTime() });
    }
    getImageUrl(value, time) {
        console.log('value', value);
        return READ_FILE + value + '&_d=' + time;
    }
    handleOnComplete(fileId) {
        this.setState({ value: fileId, _d: new Date().getTime(), preview: false });
    }
    handleOnSelect(files) {
        this.setState({
            preview: true
        })
    }
    render() {
        const image = this.state.value ? <img {...this.imageProps} src={this.getImageUrl(this.state.value, this.state._d)} /> : <img {...this.imageProps} src="src/common-imageupload/img/default.png" />
        return (<div class="common-imageupload">
            <div class="image-div">
                {image}
            </div>
            <div style={{ width: this.imageProps.width + 'px' }}>
                <CommonFileupload value={this.state.value} onSelect={this.handleOnSelect.bind(this)} onComplete={this.handleOnComplete.bind(this)} name={this.props.name} accept="image/*" />
            </div>
        </div>)
    }
}