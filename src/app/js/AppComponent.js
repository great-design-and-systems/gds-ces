import { Api } from '../../api/ApiService';
import AppContent from '../../app-content/js/AppContent';
import AppHeader from '../../app-header/js/AppHeader';
import AppSplash from '../../app-splash/js/AppSplash';
import { ItemCategoryForm } from '../../items-category-form/js/ItemCategoryForm';
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
                    <ItemCategoryForm categoryId={'587b1d5ae43557319c497541'} />
                </StickyContainer>
            );
        }
        return (
            <div> {app} </div>
        );
    }
}