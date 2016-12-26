import AppList from '../app-list/js/AppListComponent';
import React from 'react';
import { connect } from 'react-redux';

export default class StudentList extends React.Component {
    componentWillMount() {
        this.listManager = {
            get: {
                action: '{Students.getStudents}'
            },
            query: {
                start: 'page_start={start}',
                limit: 'page_limit={limit}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                },
                fitler: 'q={value}'
            }
        };
    }
    render() {
        return (<div><AppList listManager={listManager} /></div>)
    }
}