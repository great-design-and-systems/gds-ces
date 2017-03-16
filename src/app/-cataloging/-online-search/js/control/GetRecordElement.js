import lodash from 'lodash';
export default function GetRecordElement(record, field) {
    let recordElement;
    const _245 = record.dataField['245'];
    const _246 = record.dataField['246'];
    const _260 = record.dataField['260'];
    switch (field) {
        case 'description':
        {
            if (_245 && !!_245.b) {
                recordElement = _245.b;
            } else if (_246 && !!_246.b) {
                recordElement = _246.b;
            }
            break;
        }
        case 'title':
        {
            if (_245 && !!_245.a) {
                recordElement = _245.a;
            } else if (_246 && !!_246.a) {
                recordElement = _246.a;
            }
            break;
        }
        case 'author':
        {
            const contributorFields = ['100', '400', '600', '700', '800'];
            let index = 0;
            let authorField;
            do {
                authorField = record.dataField[contributorFields[index]];
                if (authorField) {
                    if (authorField instanceof Array) {
                        recordElement = '';
                        lodash.forEach(authorField, (value, index)=> {
                            if (index > 0) {
                                recordElement += ', ';
                            }
                            recordElement += value.a;
                        });
                    } else {
                        recordElement = authorField.a;
                    }
                }
                index++;
            } while (!authorField && index < contributorFields.length);
            break;
        }
        case 'edition':
        {
            const _250 = record.dataField['250'];
            if (_250) {
                recordElement = _250.a;
            }
            break;
        }

        case 'isbn':
        {
            const _020 = record.dataField['020'];
            if (_020) {
                if (_020 instanceof Array) {
                    recordElement = '';
                    lodash.forEach(_020, (value, index)=> {
                        if (index > 0) {
                            recordElement += ', ';
                        }
                        recordElement += value.a;
                    });
                } else {
                    recordElement = _020.a;
                }
            }
            break;
        }
        case 'date':
        {
            if (_260) {
                recordElement = _260.c;
            }
            break;
        }

    }
    return recordElement;
}