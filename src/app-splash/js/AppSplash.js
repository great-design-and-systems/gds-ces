import React from 'react';

export default class AppSplash extends React.Component {
    componentWillMount() {
        this.setState({
            message: this.props.message,
            header: this.props.header
        });
    }
    render() {
        return (
            <div class="app-splash">
                <div class="splash-title">
                    <h1>{this.state.header}</h1>
                    <h6>{this.state.message}</h6>
                </div>
                <div class="spinner">
                    <div class="dot1"></div>
                    <div class="dot2"></div>
                </div>
            </div>

        );
    }
}