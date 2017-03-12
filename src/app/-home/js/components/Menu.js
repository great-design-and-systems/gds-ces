import { Links } from '../../../../common/AppComponents';
import React from 'react';
import MenuLinks from './MenuLinks';
export default class Menu extends React.Component {
    render() {
        return (<div>
            <Links links={MenuLinks}/>
        </div>)
    }
}