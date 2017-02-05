import React from 'react';

export default class CommonProgressbar extends React.Component {
    componentWillMount() {
        this.setProgressState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setProgressState(nextProps);
    }
    setProgressState(props) {
        this.setState({
            limit: props.limit || 0,
            value: props.value || 0
        })
    }
    getPercentage() {
        return (this.state.value / this.state.limit) * 100;
    }
    getText() {
        if (this.state.value) {
            if (this.props.progressText) {
                return this.props.progressText(this.state.value);
            } else {
                return this.getPercentage() + '%';
            }
        }
        return '';
    }
    render() {
        const className = 'progress ' + this.props.className || '';
        const percentage = this.getPercentage();
        return (<div className={className} role="progressbar">
            <span class="progress-meter" style={{
                width: percentage + '%'
            }}>
                <p class="progress-meter-text">{this.getText()}</p>
            </span>
        </div>);
    }
}