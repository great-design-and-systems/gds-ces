import { Grid } from '../../../../common/AppComponents';
import {Link} from 'react-router';
import MenuLinks from './MenuLinks';
import React from 'react';
import { getRandomColor } from '../../../../common/AppUtils';

const HomeContent = ()=> {
    return (
        <div class="row align-center">
                <Grid links={MenuLinks}/>
        </div>)
};

export default HomeContent;