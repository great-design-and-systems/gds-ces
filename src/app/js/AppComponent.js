import {AppList, AppListActions} from '../../app-list/js/AppListComponent';

import { Api } from '../../api/ApiService';
import AppContent from '../../app-content/js/AppContent';
import AppHeader from '../../app-header/js/AppHeader';
import AppSplash from '../../app-splash/js/AppSplash';
import React from 'react';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';

const GDS_API = process.env.GDS_API || 'https://demo-gds-api.herokuapp.com/gds';

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
        this.actions = new AppListActions('sampleList', this.props.dispatch);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            headerForm: nextProps.headerForm,
            contentBody: nextProps.contentBody
        });
    }
    dirty(event) {
        this.actions.setDirty(true);
    }
    render() {
        const {headerForm} = this.props;
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'} />
        if (this.state.loaded) {
            app = (
                <StickyContainer>
                    <AppHeader headerForm={this.state.headerForm} />
                    <AppContent contentBody={this.state.contentBody} />
                    <button type="button" class="button" onClick={this.dirty.bind(this) }>Dirty</button>
                    <AppList id="sampleList" listManager={
                        {
                            root: {
                                element: 'div'
                            },
                            get: {
                                action: '{Students.getStudents}',
                                eval: 'docs'
                            },
                            each: {
                                component: (item, index) => <div key={item._id}>{item.firstName}</div>
                            }
                        }
                    } />
                </StickyContainer>
            );
        }
        return (
            <div> {app} </div>
        );
    }
}