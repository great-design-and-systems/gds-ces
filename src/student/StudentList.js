import AppList from '../app-list/js/AppListComponent';
import React from 'react';
import { connect } from 'react-redux';
export default class StudentList extends React.Component {
    componentWillMount() {
        this.listManager = {
            root: {
                element: 'ul'
            },
            get: {
                action: '{Students.getStudents}',
                eval: 'docs'
            },
            each: {
                component: (student, index) => {
                    return (<li>{student.firstName} - {index}</li>)
                }
            },
            query: {
                start: 'page_start={start}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                },
                fitler: 'q={value}'
            }
        };
    }
    render() {
        return (
            <div>
                <AppList listManager={this.listManager} />
            </div>)
    }
}