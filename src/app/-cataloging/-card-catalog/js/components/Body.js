import React from 'react';
import {Fieldset} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';
@connect()
export default class Body extends React.Component {
    componentDidUpdate(){}
    render() {
        return (<div class="card-catalog">
            <div class="large-8 large-offset-2">
                <Fieldset alwaysOpen={true} legend="Card Catalog">
                    <div></div>
                </Fieldset>
            </div>
        </div>)
    }
}