import ImageLoader from 'react-imageloader';
import Loading from 'react-loading';
import { READ_FILE } from '../../AppConstants';
import React from 'react';
import { getRandomColor } from '../../AppUtils';

export default class CommonImage extends React.Component {
    constructor() {
        super();
    }
    componentWillUnmount() {
        this.setState({});
    }
    componentWillMount() {
        this.setImageViewerState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.value && !nextProps.file) {
            this.setImageViewerState(nextProps);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.file) {
            if (!!this.props.file && !!prevProps.file) {
                if (this.props.file.name !== prevProps.file.name) {
                    this.setImageViewerState(this.props);
                }
            } else {
                this.setImageViewerState(this.props);
            }
        } else if (this.props.value !== prevProps.value) {
            this.setImageViewerState(this.props);
        }
    }
    setImageViewerState(props) {
        this.setState({
            file: props.file,
            fileId: props.fileId,
            _d: new Date().getTime()
        })
        if (!!props.file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(props.file);
        }
    }
    getImageUrl(value, time) {
        return READ_FILE + value + '&_d=' + time;
    }
    renderLoader() {
        return <Loading type="bubbles" color={getRandomColor()} />;
    }
    renderImage() {
        if (this.state.fileId) {
            return <ImageLoader
                src={this.getImageUrl(this.state.fileId, this.state._d)}
                preloader={this.renderLoader.bind(this)}>
                Image load failed!
            </ImageLoader>
        } else if (this.state.file) {
            return <img {...this.imageProps} src={this.state.imagePreviewUrl} />
        } else {
            return <img {...this.imageProps} src="/src/common-imageviewer/img/default.png" />
        }
    }
    render() {
        return this.renderImage();
    }
}