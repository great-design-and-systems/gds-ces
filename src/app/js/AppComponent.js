import { Api } from '../../api/ApiService';
import AppContent from '../../app-content/js/AppContent';
import AppHeader from '../../app-header/js/AppHeader';
import AppSidebar from '../../app-sidebar/js/AppSidebar';
import AppSplash from '../../app-splash/js/AppSplash';
import { GDS_API } from '../../common/AppConstants';
import Menu from 'react-burger-menu';
import React from 'react';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';

@connect()
export default class App extends React.Component {
    componentWillMount() {
        this.setState({});
        new Api().init(GDS_API, err => {
            if (!err) {
                this.setState({ loaded: true });
            } else {
                this.setState({
                    loaded: true,
                    error: err
                });
            }
        });
        this.componentWillReceiveProps(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            headerForm: nextProps.headerForm,
            contentBody: nextProps.contentBody,
            contentMenu: nextProps.contentMenu
        });
    }
    render() {
        const {headerForm} = this.props;
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'} />
        if (this.state.loaded) {
            console.log('content', this.state);
            app = (
                <StickyContainer id="appComponent">
                    <AppContent contentBody={this.state.contentBody} />
                </StickyContainer>
            );
        }
        return (
            <div id="appRootComponent">
                <AppSidebar outerContainerId={'appRootComponent'} pageWrapId={'appComponent'}>
                    {this.state.contentMenu}
                </AppSidebar>
                {app}
            </div>
        );
    }
}