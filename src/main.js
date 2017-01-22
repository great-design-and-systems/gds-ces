import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import { Route, Router, browserHistory } from 'react-router'
import { SettingItemList, SettingsItemControls, SettingsItemForm } from './settings-items/js/SettingsItems';
import { SettingsCategoryControls, SettingsCategoryForm, SettingsCategoryList } from './settings-categories/js/SettingsCategories';

import App from './app/js/AppComponent';
import AppSettings from './app-settings/js/AppSettings.js';
import AppStores from './common/AppStores';
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
            <Route path="settings" components={{ contentBody: AppSettings }}>
                <Route path="categories" components={{ settingsBody: SettingsCategoryList }} />
                <Route path="categories/new" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="categories/:categoryId" components={{ settingsBody: SettingsCategoryForm, controls: SettingsCategoryControls }} />
                <Route path="logs" components={{ settingsBody: LoggerList }} />
                <Route path="items" components={{ settingsBody: SettingItemList }} />
                <Route path="items/new" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
                <Route path="items/:itemId" components={{ settingsBody: SettingsItemForm, controls: SettingsItemControls }} />
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('app')[0]);