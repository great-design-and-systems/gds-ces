import { Api } from '../../api/ApiService';
import AppHeader from '../../app-header/js/AppHeader';
import AppSplash from '../../app-splash/js/AppSplash';
import React from 'react';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';

const GDS_API = process.env.GDS_API || 'http://localhost:8080/gds';

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
    render() {
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'} />
        if (this.state.loaded) {
            app = (
                <StickyContainer>
                    <AppHeader />
                </StickyContainer>
            );
        }
        return (
            <div> {app} </div>
        );
    }
}