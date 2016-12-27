import AppList from '../app-list/js/AppListComponent';
import React from 'react';
import SortToggle from '../app-list/js/components/SortToggle';
import { connect } from 'react-redux';

export default class StudentList extends React.Component {
    componentWillMount() {
        this.listManager = {
            root: {
                element: 'tbody'
            },
            get: {
                action: '{Students.getStudents}',
                eval: 'docs'
            },
            each: {
                component: (student, index) => {
                    return (<tr key={student._id}><td>{student.firstName}</td><td>{student.lastName}</td></tr>)
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
                <table>
                    <thead>
                        <tr>
                            <th><SortToggle field='firstName' label='First name' /></th>
                            <th><SortToggle field='lastName' label='Last name' /></th>
                        </tr>
                    </thead>
                    <AppList listManager={this.listManager} />
                </table>
            </div>)
    }
}