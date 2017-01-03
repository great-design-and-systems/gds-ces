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
                            <Link class="column" to={link.path}><i className={link.faIcon} /> {link.label}</Link>
                            <div class="column"> <Link class="float-right" to={link.createPath}><i class="fa fa-plus"/></Link></div>
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