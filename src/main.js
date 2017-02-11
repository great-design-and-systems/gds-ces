import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import { Category, Home, Settings } from './app/js/AppRoutes';
import { IndexRedirect, IndexRoute, Route, Router, browserHistory } from 'react-router'
import { SettingItemList, SettingsItemControls, SettingsItemForm, SettingsItemListControls } from './settings-items/js/SettingsItems';
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
            <IndexRedirect to="/home" />
            <Route path="home" components={{ contentBody: Home.body, contentMenu: Home.menu }} >
                <IndexRoute components={{ homeContent: Home.content.categories }} />
            </Route>
            <Route path="settings" components={{ contentBody: Settings.body, contentMenu: Settings.menu }}>
                <IndexRoute components={{ settingsBody: SettingsMenu }} />
                <Route path="categories" components={{ settingsBody: SettingsCategoryList, controls: SettingsCategoryListControls }} />
                <Route path="categories/new" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="categories/:categoryId" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="logs" components={{ settingsBody: LoggerList }} />
                <Route path="items" components={{ settingsBody: SettingItemList, controls: SettingsItemListControls }} />
                <Route path="items/new" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
                <Route path="items/:itemId" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
            </Route>
            <Route path="category/:categoryId" components={{ contentBody: Category.body, contentMenu: Category.menu }} >
                <Route path="grid" components={{ categoryContent: CategoryGrid }} />
                <Route path="table" />
                <Route path="list" />
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('app')[0]);