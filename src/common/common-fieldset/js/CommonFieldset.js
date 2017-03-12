import React from 'react';
export default class CommonFieldset extends React.Component {
    componentWillMount() {
        this.setFieldsetState(this.props);
    }

    setFieldsetState(props) {
        this.setState({
            expand: props.expand || props.alwaysOpen
        });
    }

    handleCollapseToggle() {
        this.setState({
            expand: !this.state.expand
        });
    }

    render() {
        const content = this.state.expand || this.props.alwaysOpen ? <div class="fieldset-content">
            {this.props.children}
        </div> : <div></div>;
        const icon = this.props.alwaysOpen ? '' : <i
            className={this.state.expand ? 'fa fa-caret-down fa-fw fa-lg': 'fa fa-caret-right fa-fw fa-lg'}/>;
        return (<fieldset class="common-fieldset">
            <legend onClick={this.handleCollapseToggle.bind(this)}>{icon}{this.props.legend}&nbsp;{this.props.icon}
            </legend>
            {content}
        </fieldset>)
    }
}