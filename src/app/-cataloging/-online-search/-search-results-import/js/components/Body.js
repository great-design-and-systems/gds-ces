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
        return (<div class="search-results-import">
            <div class="large-10 large-offset-1">
                <Fieldset alwaysOpen={true} legend={'Control Number: '+this.state.marc.controlField['001']}>
                    <div class="row">
                        <div><h5>Title:</h5></div>
                        <div class="column"><h4>{GetRecordElement(this.state.marc, 'title')}</h4></div>
                    </div>
                    <div class="row">
                        <div><h5>ISBN:</h5></div>
                        <div class="column"><h4>{GetRecordElement(this.state.marc, 'isbn')}</h4></div>
                    </div>
                    <div class="row">
                        <div><h5>Date:</h5></div>
                        <div class="column"><h4> {GetRecordElement(this.state.marc, 'date')}</h4></div>
                    </div>
                    <div class="row">
                        <div class="column">
                            {isDone && !isLoading ? <div>
                                {importResult.data.existingItem ? <h5>Control number already exists.</h5> :
                                    <h5 class="success">Done</h5>}
                            </div> : <h5><i class="fa fa-spin fa-spinner fa-fw fa-lg"/> Saving to database</h5>}
                        </div>
                    </div>
                </Fieldset>
            </div>
        </div>);
    }
}