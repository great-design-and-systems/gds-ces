import React from 'react';
import { Grid } from '../../../../common/AppComponents';
import { getRandomColor } from '../../../../common/AppUtils';
import {Link} from 'react-router';
import MenuLinks from './MenuLinks';
const CatalogingMenu = ()=> {
    return (
        <div class="row expanded align-center">
            <Grid links={MenuLinks}/>
        </div>)
};

export default CatalogingMenu;