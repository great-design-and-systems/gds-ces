import React from 'react';
import {Fieldset} from '../../../../../../common/AppComponents';
import {connect} from 'react-redux';
import GetRecordElement from '../../../js/control/GetRecordElement';
import {isApiActionLoading, isApiActionDone, action, getRandomColor, getActionData} from '../../../../../../common/AppUtils';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_IMPORT_MARC_DATA} from '../../../../../../common/AppConstants';
import {save} from '../../../../../../api/ApiActions';
import Loading from 'react-loading';
@connect(state=> {
    return {
        cataloging: state.cataloging,
        api: state.api
    }
})
export default class Body extends React.Component {
    componentWillMount() {
        this.setState({
            marc: this.props.cataloging.marc
        });
        this.props.dispatch(save(action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_IMPORT_MARC_DATA), this.props.cataloging.marc));
    }

    componentDidUpdate() {
    }

    render() {
        const isLoading = isApiActionLoading(this.props.api, action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_IMPORT_MARC_DATA));
        const isDone = isApiActionDone(this.props.api, action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_IMPORT_MARC_DATA));
        const importResult = getActionData(this.props.api, CATALOGING_DOMAIN, CATALOGING_DOMAIN_IMPORT_MARC_DATA, 'data');
        console.log('importResult', importResult);
        return (<div class="search-results-import">
            <div class="large-8 large-offset-2">
                <Fieldset alwaysOpen={true} legend={'Control Number: '+this.state.marc.controlField['001']}>
                    <div class="row">
                        <div class="column"><h4>Title: {GetRecordElement(this.state.marc, 'title')}</h4></div>
                    </div>
                    <div class="row">
                        <div class="column"><h5>ISBN: {GetRecordElement(this.state.marc, 'isbn')}</h5></div>
                    </div>
                    <div class="row">
                        <div class="column"><h6>Date: {GetRecordElement(this.state.marc, 'date')}</h6></div>
                    </div>
                    <div class="row">
                        <div class="column">
                            {isLoading && !isDone ? <Loading color={getRandomColor()}/> : ''}
                            {isDone ? <div>
                                {importResult.data.existingItem ? <h6>Control number already exists.</h6> : <h6>Done</h6>}
                            </div> : ''}
                        </div>
                    </div>
                </Fieldset>
            </div>
        </div>);
    }
}