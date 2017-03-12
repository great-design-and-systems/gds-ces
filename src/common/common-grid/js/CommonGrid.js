import React,{Component} from 'react';
import {Link} from 'react-router';
import { getRandomColor } from '../../AppUtils';

export default class CommonGrid extends Component {
    render() {
        const links = [];
        if (this.props.links) {
            this.props.links.forEach(link => {
                links.push(
                    <Link to={link.path} key={link.label}
                          className={'column column-block'}>
                        <div class="grid-content">
                            <h3><i className={link.faIcon}/></h3>
                            <span class="grid-title">{link.label}</span>
                        </div>
                    </Link>)
            });
        }
        return (
            <div class="expanded common-grid small-10 small-offset-1 large-offset-2">
                <div class="row small-up-2 medium-up-3 large-up-5 align-center align-middle">
                    {links}
                </div>
            </div>)
    }
}