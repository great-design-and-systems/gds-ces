import React from 'react';

export default class AppMenu extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<ul class="menu align-right">
            <li><a href="#">One</a></li>
            <li><a href="#">Two</a></li>
            <li><a href="#">Three</a></li>
            <li><a href="#">Four</a></li>
        </ul>)
    }
}