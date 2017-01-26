import { Api } from '../../api/ApiService';
import AppContent from '../../app-content/js/AppContent';
import AppHeader from '../../app-header/js/AppHeader';
import AppSplash from '../../app-splash/js/AppSplash';
import { GDS_API } from '../../common/AppConstants';
import { Imageupload } from '../../common/AppComponents';
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
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            headerForm: nextProps.headerForm,
            contentBody: nextProps.contentBody
        });
    }
    render() {
        const {headerForm} = this.props;
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'} />
        if (this.state.loaded) {
            app = (
                <StickyContainer>
                    <AppHeader headerForm={this.state.headerForm} />
                    <AppContent contentBody={this.state.contentBody} />
                    <Imageupload className={'large-3'} name="sampleImage" value={'588a3559593cfe346c899f52'} />
                </StickyContainer>
            );
        }
        return (
            <div> {app} </div>
        );
    }
}