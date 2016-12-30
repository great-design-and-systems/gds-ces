import './app/css/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'script!jquery';
import 'script!foundation-sites';

import App from './app/js/AppComponent';
import AppStores from './common/AppStores';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import initPrototypes from './common/AppPrototypes';

$(document).foundation();
initPrototypes();

ReactDOM.render(<Provider store={AppStores}><App /></Provider>, document.getElementsByTagName('app')[0]);
