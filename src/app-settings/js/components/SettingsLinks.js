import { Link } from 'react-router';
import React from 'react';

export default class SettingsLink extends React.Component {
    render() {
        const links = [];
        if (this.props.links) {
            this.props.links.forEach(link => {
                let item;
                if (link.createsNew) {
                    item = (
                        <li key={link.label.hashCode()}><div class="row">
                            <div class="column"><Link to={link.path}><i className={link.faIcon} /> <span>{link.label}</span></Link></div>
                            <div class="link-control-div"><Link to={link.createPath}><i class="fa fa-plus" /></Link></div>
                        </div>
                        </li>)
                }
                else {
                    item = (<li key={link.label.hashCode()}><Link to={link.path}><i className={link.faIcon} />{link.label}</Link></li>)
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