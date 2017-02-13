import AppForm from '../../../../../-form/js/AppFormComponent';
import { AppFormManager } from '../../../../../-form/js/AppForm';
import { Field } from '../../../../../-form/js/AppForm';
import React from 'react';
import { wrapComponent } from '../../../../../../common/AppUtils';

export default class Basic extends React.Component {
    constructor() {
        super();
        this.formFields = this.createFormFields();
        this.formManager = new AppFormManager();
    }

    createTitleField() {
        const field = new Field('input');
        field.setLabel('Title');
        field.setName('title');
        field.setProperties({
            type: 'text'
        });
        field.setRequired(true);
        return field;
    }

    createStatementOfResponsibilityField() {
        const field = new Field('input');
        field.setLabel('Statement of Responsibility');
        field.setName('responsibility');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createSeriesTitleField() {
        const field = new Field('input');
        field.setLabel('Series Title');
        field.setName('seriesTitle');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createISBNField() {
        const field = new Field('input');
        field.setLabel('ISBN');
        field.setName('isbn');
        field.setProperties({
            type: 'text'
        });
        field.setRequired(true);
        return field;
    }

    createISSNField() {
        const field = new Field('input');
        field.setLabel('ISSN');
        field.setName('issn');
        field.setProperties({
            type: 'text'
        });
        field.setRequired(true);
        return field;
    }

    createPublisherField() {
        const field = new Field('input');
        field.setLabel('Publisher');
        field.setName('publisher');
        field.setProperties({
            type: 'text'
        });
        field.setRequired(true);
        return field;
    }

    createNumberOfPagesField() {
        const field = new Field('input');
        field.setLabel('Number of pages');
        field.setName('numberOfPages');
        field.setProperties({
            type: 'number'
        });
        return field;
    }

    createSubTitleField() {
        const field = new Field('input');
        field.setLabel('Sub-Title');
        field.setName('subTitle');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createEditionField() {
        const field = new Field('input');
        field.setLabel('Edition');
        field.setName('edition');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createAuthorField() {
        const field = new Field('listinput');
        field.setLabel('Author');
        field.setName('author');
        field.setRequired(true);
        return field;
    }

    createLCCNField() {
        const field = new Field('input');
        field.setLabel('LCCN');
        field.setName('lccn');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createPlaceOfPublicationField() {
        const field = new Field('input');
        field.setLabel('Place of Publication');
        field.setName('placeOfPublication');
        field.setProperties({
            type: 'text'
        });
        return field;
    }

    createPublishedDateField() {
        const field = new Field('date');
        field.setLabel('Published Date');
        field.setName('publishedDate');
        field.setRequired(true);
        return field;
    }

    createImageuploadField() {
        const field = new Field('imageupload');
        field.setLabel('Image');
        field.setName('image');
        field.setRequired(true);
        return field;
    }

    createColumnField() {
        const field = new Field('column');
        field.setProperties({
            className: 'large-4 medium-4 small-12'
        });
        return field;
    }

    createFormFields() {
        const formFields = [];
        formFields.push(this.createTitleField());
        formFields.push(this.createStatementOfResponsibilityField());
        formFields.push(this.createSeriesTitleField());
        formFields.push(this.createISBNField());
        formFields.push(this.createISSNField());
        formFields.push(this.createPublisherField());
        formFields.push(this.createNumberOfPagesField());
        formFields.push(this.createColumnField());
        formFields.push(this.createSubTitleField());
        formFields.push(this.createEditionField());
        formFields.push(this.createAuthorField());
        formFields.push(this.createLCCNField());
        formFields.push(this.createPlaceOfPublicationField());
        formFields.push(this.createPublishedDateField());
        formFields.push(this.createColumnField());
        formFields.push(this.createImageuploadField());
        formFields.push(this.createColumnField());
        return formFields;
    }
    handleOnChangeBasic(model) {
    }
    render() {
        return wrapComponent('manual_entry_basic', AppForm)({
            id: 'basicForm',
            overrideSubmit: true,
            onChange: this.handleOnChangeBasic.bind(this),
            className: 'basic',
            formFields: this.formFields,
            formManager: this.formManager
        });
    }
}