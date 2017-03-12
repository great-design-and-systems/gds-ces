import AppInterceptor from '../../../-interceptor/AppInterceptor';
import { Link } from 'react-router';
import React from 'react'
import { Body, Content, View } from '../../../../common/AppComponents';

export default class Cataloging extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View load={AppInterceptor}>
                <Body className={'cataloging'}>
                <h3 class="body-title">Cataloging
                    <Link title={'Go to home'} to={'/home'}><i class="fa fa-home fa-fw fa-lg"/></Link> <i class="fa fa-archive fa-fw fa-lg active"/></h3>
                <Content>
                    {this.props.controls}
                    {this.props.catalogingContent}
                </Content>
                </Body>
            </View>)
    }
}