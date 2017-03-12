import { Config ,Field, FieldConverter } from '../../../../-form/js/AppForm';

function CreateAdditionalFormField() {
    const formFields = [];
    formFields.push(createSubjectsField());
    formFields.push(createSummaryField());
    formFields.push(createStudyProgram());
    formFields.push(createTitlePoints());
    formFields.push(createInternetResource());
    formFields.push(createColumnField());


    formFields.push(createGeneralNote());
    formFields.push(createReadingLevel());
    formFields.push(createResourceType());
    formFields.push(createColumnField());


    formFields.push(createFieldSet());
    return formFields;
}

function createFieldSet() {
    const field = new Field('fieldset');
    field.setProperties({
        title: 'Additional',
        className: 'row expanded'
    });
    return field;
}


function createSubjectsField() {
    const field = new Field('listinput');
    field.setLabel('Subjects');
    field.setName('650.a');
    field.setRequired(true);
    return field;
}

function createSummaryField() {
    const field = new Field('textArea');
    field.setLabel('Summary');
    field.setName('300.a');
    return field;
}

function createStudyProgram() {
    const field = new Field('input');
    field.setProperties({
        type: 'text'
    });
    field.setLabel('Study (Reading) Program');
    field.setName('526.a');
    return field;
}

function createTitlePoints() {
    const field = new Field('input');
    field.setProperties({
        type: 'text'
    });
    field.setLabel('Title Points');
    field.setName('526.d');
    return field;
}
function createInternetResource() {
    const field = new Field('input');
    field.setProperties({
        type: 'text'
    });
    field.setLabel('Internet Resource');
    field.setName('856.u');
    return field;
}

function createGeneralNote() {
    const field = new Field('textArea');
    field.setLabel('General Note');
    field.setName('500.a');
    return field;
}


function createReadingLevel() {
    const field = new Field('select');
    field.setLabel('Reading Level');
    field.setName('526.c');
    field.setProperties({
        options: {
            'Pre-school': 'a',
            Primary: 'b',
            'Pre-adolescent': 'd',
            Adult: 'e',
            Specialized: 'f',
            General: 'g',
            Juvenile: 'j',
            'No attempt to code': '|'
        }
    });
    return field;
}

function createResourceType() {
    const field = new Field('select');
    field.setLabel('Resource Type');
    field.setName('resourceType');

    return field;
}

function createColumnField() {
    const field = new Field('column');
    field.setProperties({
        className: 'large-4 medium-4 small-12'
    });
    return field;
}
export  default CreateAdditionalFormField;