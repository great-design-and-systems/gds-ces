import '../css/app.scss';

import { Api } from '../../api/ApiService';
import App from './AppComponent';
import AppStores from '../../common/AppStores';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import ItemCategoryFormComponent from '../../item-category/js/ItemCategoryFormComponent';
const GDS_API = process.env.GDS_API || 'https://demo-gds-api.herokuapp.com/gds';

new Api().init(GDS_API, err => {
    if (!err) {
        ReactDOM.render(<Provider store={AppStores}><ItemCategoryFormComponent /></Provider>, document.getElementsByTagName('app')[0]);
    }
    else {
        console.error(err);
    }
});


