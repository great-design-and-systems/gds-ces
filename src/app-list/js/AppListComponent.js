import CreateQuery from './control/CreateQuery';
import EvaluateList from './control/EvaluateList';
import GetList from './control/GetList';
import IsNewQuery from './control/IsNewQuery';
import React from 'react';
import StudentList from './control/RenderList';
import { connect } from 'react-redux';
import lodash from 'lodash';

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
        const newQuery = new CreateQuery(this.props).getQuery();
        this.query = newQuery;
        const params = this.props.listManager.get ? this.props.listManager.get.params : {};
        new GetList(this.props.dispatch, this.props.listManager, this.query, params);
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.api.pending) {
            const newQuery = new CreateQuery(nextProps, this.query).getQuery();
            if (new IsNewQuery(this.query, newQuery, nextProps).isNew()) {
                this.query = newQuery;
                new GetList(this.props.dispatch, this.props.listManager, this.query, nextProps.list.params);
            }
        }

    }
    render() {
        const list = new EvaluateList(this.props.api, this.props.listManager).getList();
        return React.createElement(this.props.listManager.root.element, this.props.listManager.root.props || {},
            new StudentList(list, this.props.listManager.each).render());
    }
}