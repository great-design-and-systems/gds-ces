import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

export default class AppHeader extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Sticky class="app-header top-bar">
                <div class="top-bar-title">
                    <a href="#/"><strong>LibCat</strong></a>
                </div>
                <div>
                    <div class="top-bar-left"></div>
                    <div class="top-bar-right"></div>
                </div>
            </Sticky>);
    }
}