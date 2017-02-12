import React from 'react';
export default class Body extends React.Component {
    render() {
        return (
            <div class="settings-cataloguing">
                {this.props.cataloguingContent}
            </div>
        )
    }
}