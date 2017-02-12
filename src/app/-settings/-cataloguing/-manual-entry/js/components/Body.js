import React from 'react';
import AppForm from '../../../../../-form/js/AppFormComponent';
import Tabs from './Tabs';
export default class Body extends React.Component {
    render() {
        return (<div class="manual-entry body">
            <div class="row header expanded">
                <h5 class="header-title">Manual Entry</h5>
                <div class="column"></div>
                <Tabs location={this.props.location}/>
            </div>
            {this.props.tabContent}
        </div>)
    }
}