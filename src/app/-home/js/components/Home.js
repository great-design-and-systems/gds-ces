import { Body, Content, View } from '../../../../common/AppComponents';
import AppInterceptor from '../../../-interceptor/AppInterceptor';
import React from 'react';
import HomeContent from './HomeContent';

export default class Home extends React.Component {
    render() {
        return (<View load={AppInterceptor}>
            <Body id="homeBody">

            <h3 class="body-title">LibCatalog
                <i class='fa fa-home fa-fw fa-lg active'/>
            </h3>
            <Content>
                {HomeContent()}
            </Content>
            </Body>
        </View>)
    }
}