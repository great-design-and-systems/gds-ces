import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import { Route, Router, browserHistory } from 'react-router'
import { SettingsCategoryForm, SettingsCategoryList } from './settings-categories/js/SettingsCategories';

import App from './app/js/AppComponent';
import AppSettings from './app-settings/js/AppSettings.js';
import AppStores from './common/AppStores';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import initPrototypes from './common/AppPrototypes';

$(document).foundation();
initPrototypes();

console.log('new Foundation', Foundation);
ReactDOM.render(<Provider store={AppStores}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="settings" components={{ contentBody: AppSettings }}>
                <Route path="categories" components={{ settingsBody: SettingsCategoryList }} />
                <Route path="categories/new" components={{ settingsBody: SettingsCategoryForm }} />
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('app')[0]);
