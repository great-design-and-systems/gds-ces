import React from 'react';

export default class Description extends React.Component {
    render() {
        return (<div class="card-catalog-description">
            <div>
                <h5>&nbsp;&nbsp;{getPhysicalDescription(this.props.marc)}</h5>
            </div>
            <div>
                <h5>&nbsp;&nbsp;{getGeneralNotes(this.props.marc)}</h5>
            </div>
            <div>
                <h5>&nbsp;&nbsp;ISBN:&nbsp;{getISBN(this.props.marc)}</h5>
            </div>
        </div>);
    }
}

function getPhysicalDescription(marc) {
    const dataField = marc.dataField;
    return dataField['300'] ? dataField['300'].a + ' ' + dataField['300'].b + ' ' + dataField['300'].c : '';
}

function getGeneralNotes(marc) {
    const dataField = marc.dataField;
    return dataField['500'] ? dataField['500'].a : '';
}

function getISBN(marc) {
    const dataField = marc.dataField;
    return dataField['020'] ? dataField['020'].a : '';
}