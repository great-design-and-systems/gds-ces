import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!what-input';
import 'script!foundation-sites';

import { Cataloging, Home } from './app/js/AppRoutes';
import { IndexRedirect, IndexRoute, Route, Router, browserHistory } from 'react-router'

import App from './app/js/App';
import AppStores from './common/AppStores';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import initPrototypes from './common/AppPrototypes';

initPrototypes();
ReactDOM.render(<Provider store={AppStores}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/home" />
            <Route path="home" components={{ contentBody: Home.body, contentMenu: Home.menu }} />
            <Route path="cataloging" components={{ contentBody: Cataloging.body, contentMenu: Home.menu }}>
                <IndexRedirect to="/cataloging/menu" />
                <Route path="menu" components={{ catalogingContent: Cataloging.content.main }} />
                <Route path="entry" components={{ catalogingContent: Cataloging.content.manualEntry.body }} />
                <Route path="search" components={{ catalogingContent: Cataloging.content.search.body }}>
                    <IndexRedirect to="/cataloging/search/results" />
                    <Route path="results" components={{ searchContent: Cataloging.content.search.content.results }} />
                </Route>
                <Route path="import"
                    components={{ catalogingContent: Cataloging.content.search.content.searchResultsImport }} />
                <Route path="materials" components={{ catalogingContent: Cataloging.content.materials.body }} />
                <Route path="card-view/:category/:itemId" components={{ catalogingContent: Cataloging.content.card.body }} />
            </Route>
        </Route>
    </Router>
</Provider>, document.getElementsByTagName('body')[0]);