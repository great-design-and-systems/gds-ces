import { Body, Content, Sidebar, View } from '../../../../common/AppComponents';

import AppInterceptor from '../../../-interceptor/AppInterceptor';
import {Link} from 'react-router';
import React from 'react';
import { wrapComponent } from '../../../../common/AppUtils';

export default class Home extends React.Component {
    render() {
        return (<View load={AppInterceptor}>
            <Body id="homeBody">
                <h3 class="body-title">LibCatalog <i class='fa fa-home fa-fw fa-lg' /><Link title={'Go to settings'} to={'/settings'}><i class="fa fa-gears fa-fw fa-lg"/></Link></h3>
                <Content>
                    <div class="row expanded align-center">
                        {this.props.homeContent}
                    </div>
                </Content>
            </Body>
        </View>)
    }
}