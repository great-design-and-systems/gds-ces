import React from 'react';
import {connect} from 'react-redux';

@connect((state) => {
    return { students: state.api.Students };
})
class App extends React.Component {
    render() {
        const {students} = this.props;
        const studentsList = [];
        let pending = undefined;
        if (students && students.getStudents) {
            if (students.getStudents.data && students.getStudents.data.docs) {
                students.getStudents.data.docs.forEach(item => {
                    studentsList.push(<li key={item._id}>{item.lastName}, {item.firstName}</li>);
                });
            }
            pending = students.getStudents.pending;
        }
        return (<div>
            <button disabled={pending === true} onClick={this.getStudents.bind(this) }>Get Students</button>
            <ul>
                { studentsList }
            </ul>
        </div>)
    }
    getStudents() {
        this.props.dispatch({
            type: '{Students.getStudents}',
            payload: {
                query: { limit: 100 }
            }
        });
    }
}
export default App;