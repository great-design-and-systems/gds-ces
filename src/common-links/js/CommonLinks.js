import AppFormLink from '../../app-form/js/components/AppFormLink';
import { Link } from 'react-router';
import React from 'react';

export default class CommonLinks extends React.Component {
    render() {
        const links = [];
        if (this.props.links) {
            this.props.links.forEach(link => {
                let item;
                if (link.createsNew) {
                    item = (
                        <li key={link.label.hashCode()}><div class="row">
                            <div class="column"><Link to={link.path}><i className={'link-icon ' + link.faIcon} /> <span class="link-label">{link.label}</span></Link></div>
                            <div class="link-control-div"><AppFormLink title="Add" to={link.createPath}><i class="link-icon fa fa-plus" /></AppFormLink></div>
                        </div>
                        </li>)
                }
                else {
                    item = (<li key={link.label.hashCode()}>
                        <div class="row">
                            <div class="column"><Link to={link.path}><i className={'link-icon ' + link.faIcon} /> <span class="link-label">{link.label}</span></Link></div>
                        </div>
                    </li>)
                }
                links.push(item);
            })
        }
        return (
            <ul class="common-links vertical menu">
                {links}
            </ul>);
    }
}