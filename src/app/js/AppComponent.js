import { Api } from '../../api/ApiService';
import AppContent from '../-content/js/AppContent';
import AppSidebar from '../-sidebar/js/AppSidebar';
import AppSplash from '../-splash/js/AppSplash';
import { GDS_API } from '../../common/AppConstants';
import React from 'react';
import SidebarStore from '../-sidebar/js/AppSidebarStore';
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
            contentBody: nextProps.contentBody,
            contentMenu: nextProps.contentMenu
        });
    }

    render() {
        const {headerForm} = this.props;
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'} />
        if (this.state.loaded) {
            app = (
                <StickyContainer id="appComponent">
                    <AppContent contentBody={this.state.contentBody} />
                </StickyContainer>
            );
        }
        return (
            <div id="appRootComponent">
                <AppSidebar store={SidebarStore} outerContainerId={'appRootComponent'} pageWrapId={'appComponent'}>
                    {this.state.contentMenu}
                </AppSidebar>
                {app}
            </div>
        );
    }
}