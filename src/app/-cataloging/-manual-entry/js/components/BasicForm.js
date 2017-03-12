import { Config, AppForm ,Field, FieldConverter } from '../../../../-form/js/AppForm';

function CreateBasicFormFields() {
    const formFields = [];
    formFields.push(createTitleField());
    formFields.push(createStatementOfResponsibilityField());
    formFields.push(createSeriesTitleField());
    formFields.push(createISBNField());
    formFields.push(createISSNField());
    formFields.push(createPublisherField());
    formFields.push(createNumberOfPagesField());
    formFields.push(createColumnField());
    formFields.push(createSubTitleField());
    formFields.push(createEditionField());
    formFields.push(createAuthorField());
    formFields.push(createLCCNField());
    formFields.push(createPlaceOfPublicationField());
    formFields.push(createPublishedDateField());
    formFields.push(createColumnField());
    formFields.push(createImageuploadField());
    formFields.push(createColumnField());
    formFields.push(createFieldSet());

    return formFields;
}

function createFieldSet() {
    const field = new Field('fieldset');
    field.setProperties({
        title: 'Basic',
        expand: true,
        className: 'row expanded'
    });
    return field;
}
function createTitleField() {
    const field = new Field('input');
    field.setLabel('Title');
    field.setName('title');
    field.setProperties({
        type: 'text'
    });
    field.setRequired(true);
    return field;
}

function createStatementOfResponsibilityField() {
    const field = new Field('input');
    field.setLabel('Statement of Responsibility');
    field.setName('responsibility');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createSeriesTitleField() {
    const field = new Field('input');
    field.setLabel('Series Title');
    field.setName('seriesTitle');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createISBNField() {
    const field = new Field('input');
    field.setLabel('ISBN');
    field.setName('isbn');
    field.setProperties({
        type: 'text'
    });
    field.setRequired(true);
    return field;
}

function createISSNField() {
    const field = new Field('input');
    field.setLabel('ISSN');
    field.setName('issn');
    field.setProperties({
        type: 'text'
    });
    field.setRequired(true);
    return field;
}

function createPublisherField() {
    const field = new Field('input');
    field.setLabel('Publisher');
    field.setName('publisher');
    field.setProperties({
        type: 'text'
    });
    field.setRequired(true);
    return field;
}

function createNumberOfPagesField() {
    const field = new Field('input');
    field.setLabel('Number of pages');
    field.setName('numberOfPages');
    field.setProperties({
        type: 'number'
    });
    return field;
}

function createSubTitleField() {
    const field = new Field('input');
    field.setLabel('Sub-Title');
    field.setName('subTitle');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createEditionField() {
    const field = new Field('input');
    field.setLabel('Edition');
    field.setName('edition');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createAuthorField() {
    const field = new Field('listinput');
    field.setLabel('Author');
    field.setName('author');
    field.setRequired(true);
    return field;
}

function createLCCNField() {
    const field = new Field('input');
    field.setLabel('LCCN');
    field.setName('lccn');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createPlaceOfPublicationField() {
    const field = new Field('input');
    field.setLabel('Place of Publication');
    field.setName('placeOfPublication');
    field.setProperties({
        type: 'text'
    });
    return field;
}

function createPublishedDateField() {
    const field = new Field('date');
    field.setLabel('Published Date');
    field.setName('publishedDate');
    field.setRequired(true);
    return field;
}

function createImageuploadField() {
    const field = new Field('imageupload');
    field.setLabel('Image');
    field.setName('image');
    field.setRequired(true);
    return field;
}

function createColumnField() {
    const field = new Field('column');
    field.setProperties({
        className: 'large-4 medium-4 small-12'
    });
    return field;
}

export default CreateBasicFormFields;