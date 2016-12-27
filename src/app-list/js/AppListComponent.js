import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import CreateQuery from './control/CreateQuery';
import IsNewQuery from './control/IsNewQuery';
import GetList from './control/GetList';
import EvaluateList from './control/EvaluateList';
import StudentList from './control/RenderList';
@connect(state => {
    return {
        api: state.api,
        list: state.list
    }
})
export default class AppList extends React.Component {
    constructor(props) {
        super();
        this.query = undefined;
        if (props.listManager) {
            if (!props.listManager) {
                throw new Error('Property listManager is required.');
            }
        }
    }
    componentWillMount() {
        this.setState({
            list: undefined
        });
        const newQuery = new CreateQuery(this.props).getQuery();
        this.query = newQuery;
        new GetList(this.props.dispatch, this.props.listManager, this.query);
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.list.pending) {
            const newQuery = new CreateQuery(nextProps, this.props, this.query).getQuery();
            if (new IsNewQuery(this.query, newQuery).isNew()) {
                this.query = newQuery;
                new GetList(this.props.dispatch, this.props.listManager, this.query);
            }
        } else if (!nextProps.api.pending && !nextProps.api.error) {
            this.setState({ list: new EvaluateList(nextProps.dispatch, nextProps.api, nextProps.listManager).getList() });
        }
    }
    render() {
        return React.createElement(this.props.listManager.root.element, this.props.listManager.root.props || {},
            new StudentList(this.state.list, this.props.listManager.each).render());
    }
}