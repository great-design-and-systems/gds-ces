import AppFormCategories from './components/AppFormCategories';
import AppFormCategoryFields from './components/AppFormCategoryFields';
import AppFormCheckBox from './components/AppFormCheckbox';
import AppFormDate from './components/AppFormDate';
import AppFormImageupload from './components/AppFormImageupload';
import AppFormInput from './components/AppFormInput';
import AppFormListInput from './components/AppFormListInput';
import AppFormRadio from './components/AppFormRadio';
import AppFormSelect from './components/AppFormSelect';
import AppIconBox from './components/AppIconBox';
import AppFormTextarea from './components/AppFormTextarea';
import React from 'react';

const DefaultTemplates = {
    input: (field, formManager) => <AppFormInput field={field} formManager={formManager}/>,
    checkbox: (field, formManager) => <AppFormCheckBox field={field} formManager={formManager}/>,
    select: (field, formManager) => <AppFormSelect field={field} formManager={formManager}/>,
    radio: (field, formManager) => <AppFormRadio field={field} formManager={formManager}/>,
    iconBox: (field, formManager) => <AppIconBox field={field} formManager={formManager}/>,
    categories: (field, formManager) => <AppFormCategories field={field} formManager={formManager}/>,
    imageupload: (field, formManager) => <AppFormImageupload field={field} formManager={formManager}/>,
    categoryFields: (field, formManager) => <AppFormCategoryFields field={field} formManager={formManager}/>,
    date: (field, formManager) => <AppFormDate field={field} formManager={formManager}/>,
    listinput: (field, formManager) => <AppFormListInput field={field} formManager={formManager}/>,
    textArea: (field, formManager)=><AppFormTextarea field={field} formManager={formManager}/>
};

export default DefaultTemplates;