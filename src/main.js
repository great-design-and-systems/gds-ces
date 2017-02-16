import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import { Category, Home, Settings } from './app/js/AppRoutes';
import { IndexRedirect, IndexRoute, Route, Router, browserHistory } from 'react-router'
import { SettingsCategoryControls, SettingsCategoryForm, SettingsCategoryList, SettingsCategoryListControls } from './settings-categories/js/SettingsCategories';

import App from './app/js/AppComponent';
import AppStores from './common/AppStores';
import { CategoryGrid } from './category-grid/js/CategoryGrid';
import LoggerList from './settings-logger/js/LoggerList';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import initPrototypes from './common/AppPrototypes';

$(document).foundation();
initPrototypes();

ReactDOM.render(<Provider store={AppStores}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="home" components={{ contentBody: Home.body, contentMenu: Home.menu }}>
                <IndexRoute components={{ homeContent: Home.content.categories }}/>
            </Route>
            <Route path="settings" components={{ contentBody: Settings.body, contentMenu: Settings.menu }}>
                <IndexRoute components={{ settingsBody: Settings.menu }}/>
                <Route path="categories"
                       components={{ settingsBody: SettingsCategoryList, controls: SettingsCategoryListControls }}/>
                <Route path="categories/new"
                       components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }}/>
                <Route path="categories/:categoryId"
                       components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }}/>
                <Route path="logs" components={{ settingsBody: LoggerList }}/>
                <Route path="items"
                       components={{ settingsBody: Settings.content.items.list, controls: Settings.content.items.listControl }}/>
                <Route path="items/new"
                       components={{ settingsBody: Settings.content.items.form, controls: Settings.content.items.formControl }}/>
                <Route path="items/:itemId"
                       components={{ settingsBody:  Settings.content.items.form, controls: Settings.content.items.formControl }}/>
                <Route path="cataloguing"
                       components={{ settingsBody:  Settings.content.cataloguing.body, controls: Settings.content.cataloguing.controls }}>
                    <Route path="manual_entry"
                           components={{ cataloguingContent: Settings.content.cataloguing.content.manualEntry.body }}>
                        <Route path="basic"
                               components={{ tabContent: Settings.content.cataloguing.content.manualEntry.tabs.basic }}>
                        </Route>
                        <Route path="additional"
                               components={{ tabContent: Settings.content.cataloguing.content.manualEntry.tabs.additional }}>
                        </Route>
                    </Route>
                    <Route path="online_search"
                           components={{cataloguingContent: Settings.content.cataloguing.onlineSearch.body}}/>
                </Route>
            </Route>
            <Route path="category/:categoryId" components={{ contentBody: Category.body, contentMenu: Category.menu }}>
                <Route path="grid" components={{ categoryContent: CategoryGrid }}/>
                <Route path="table"/>
                <Route path="list"/>
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('app')[0]);