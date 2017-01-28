import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import { IndexRedirect, IndexRoute, Route, Router, browserHistory } from 'react-router'
import { SettingItemList, SettingsItemControls, SettingsItemForm, SettingsItemListControls } from './settings-items/js/SettingsItems';
import { SettingsCategoryControls, SettingsCategoryForm, SettingsCategoryList, SettingsCategoryListControls } from './settings-categories/js/SettingsCategories';

import App from './app/js/AppComponent';
import AppHome from './app-home/js/AppHome';
import AppSettings from './app-settings/js/AppSettings';
import AppStores from './common/AppStores';
import HomeCategories from './home-categories/js/HomeCategories';
import HomeMenu from './home-menu/js/HomeMenu';
import LoggerList from './settings-logger/js/LoggerList';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import SettingsMenu from './settings-menu/js/SettingsMenu';
import initPrototypes from './common/AppPrototypes';

$(document).foundation();
initPrototypes();

ReactDOM.render(<Provider store={AppStores}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/home" />
            <Route path="home" components={{ contentBody: AppHome, contentMenu: HomeMenu }} >
                <IndexRoute components={{ homeContent: HomeCategories }} />
            </Route>
            <Route path="settings" components={{ contentBody: AppSettings, contentMenu: SettingsMenu }}>
                <IndexRoute components={{ settingsBody: SettingsMenu }} />
                <Route path="categories" components={{ settingsBody: SettingsCategoryList, controls: SettingsCategoryListControls }} />
                <Route path="categories/new" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="categories/:categoryId" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="logs" components={{ settingsBody: LoggerList }} />
                <Route path="items" components={{ settingsBody: SettingItemList, controls: SettingsItemListControls }} />
                <Route path="items/new" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
                <Route path="items/:itemId" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('app')[0]);