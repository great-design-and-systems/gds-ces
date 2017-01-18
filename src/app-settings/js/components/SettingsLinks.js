import { Link, browserHistory } from 'react-router';

import React from 'react';
import {clearForm} from '../../../app-form/js/AppFormActions';
import {connect} from 'react-redux';

@connect()
export default class SettingsLink extends React.Component {
    handleOnCreate(event) {
        //TODO: create link component to get the path
        this.props.dispatch(clearForm());
    }
    render() {
        const links = [];
        if (this.props.links) {
            this.props.links.forEach(link => {
                let item;
                if (link.createsNew) {
                    item = (
                        <li key={link.label.hashCode() }><div class="row">
                            <div class="column"><Link to={link.path}><i className={link.faIcon} /> <span>{link.label}</span></Link></div>
                            <div class="link-control-div"><a onClick={this.handleOnCreate.bind(this) } href={link.createPath}><i class="fa fa-plus" /></a></div>
                        </div>
                        </li>)
                }
                else {
                    item = (<li key={link.label.hashCode() }>
                        <div class="row">
                            <div class="column"><Link to={link.path}><i className={link.faIcon} /> <span>{link.label}</span></Link></div>
                        </div>
                    </li>)
                }
                links.push(item);
            })
        }
        return (
            <ul class="vertical menu">
                {links}
            </ul>);
    }
}