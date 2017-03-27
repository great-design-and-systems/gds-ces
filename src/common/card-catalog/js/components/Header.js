import React from 'react';

export default class Header extends React.Component {
    render() {
        console.log('header', this.props);
        return (<div class="card-catalog-header">
            <div>
                <h4><b>{getAuthor(this.props.marc)}&nbsp;{getDataAssociated(this.props.marc)}</b></h4>
            </div>
            <div>
                <h4>&nbsp;{getTitleProper(this.props.marc)}{getOtherTitle(this.props.marc)}</h4>
            </div>
            <div>
                <h4>{getStatementOfResponsibility(this.props.marc)}&nbsp;
                    --&nbsp;{getPlaceOfPublisher(this.props.marc)}&nbsp;
                    :&nbsp;{getNameOfPublisher(this.props.marc)}&nbsp;
                    {getPublishedDate(this.props.marc)}</h4>
            </div>
        </div>);
    }
}

function getAuthor(marc) {
    const dataField = marc.dataField;
    let author;
    if (dataField['100']) {
        author = dataField['100'].a;
    } else if (dataField['110']) {
        author = dataField['110'].a;
    } else if (dataField['600']) {
        author = dataField['600'].a;
    } else if (dataField['700']) {
        author = dataField['700'].a;
    }
    return author;
}
function getDataAssociated(marc) {
    const dataField = marc.dataField;
    let date;
    if (dataField['100']) {
        date = dataField['100'].d;
    } else if (dataField['110']) {
        date = dataField['110'].d;
    } else if (dataField['600']) {
        date = dataField['600'].d;
    } else if (dataField['700']) {
        date = dataField['700'].d;
    }
    return date;
}

function getTitleProper(marc) {
    const dataField = marc.dataField;
    return dataField['245'] ? dataField['245'].a : '';
}

function getOtherTitle(marc) {
    const dataField = marc.dataField;
    return dataField['245'] && dataField['245'].b ? +': ' + dataField['245'].b : '';
}

function getStatementOfResponsibility(marc) {
    const dataField = marc.dataField;
    return dataField['245'] && dataField['245'].c ? dataField['245'].c : '';
}

function getPlaceOfPublisher(marc) {
    const dataField = marc.dataField;
    return dataField['260'] && dataField['260'].a ? dataField['260'].a : '';
}

function getNameOfPublisher(marc) {
    const dataField = marc.dataField;
    return dataField['260'] && dataField['260'].b ? dataField['260'].b : '';
}

function getPublishedDate(marc) {
    const dataField = marc.dataField;
    return dataField['260'] ? dataField['260'].c : '';
}