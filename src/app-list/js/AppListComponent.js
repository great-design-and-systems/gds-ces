import CreateQuery from './control/CreateQuery';
import EvaluateList from './control/EvaluateList';
import GetList from './control/GetList';
import IsNewQuery from './control/IsNewQuery';
import React from 'react';
import StudentList from './control/RenderList';
import { connect } from 'react-redux';
import { isApiActionDone } from '../../common/AppUtils';
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
        if (!props.id) {
            throw new Error('Property id is required.');
        }
        this.id = props.id;
    }
    componentWillMount() {
        this.setState({ list: [] });
        if (this.props.list && this.props.list.target === this.id) {
            const newQuery = new CreateQuery(this.props).getQuery();
            this.query = newQuery;
            const params = this.props.listManager.get ? this.props.listManager.get.params : {};
            new GetList(this.props.dispatch, this.props.listManager, newQuery, params);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.id === nextProps.list.target) {
            const thisList = nextProps.list.getState();
            if (!nextProps.api.pending && !thisList.pending) {
                if (thisList.dirty) {
                    const newQuery = new CreateQuery(nextProps, this.query).getQuery();
                    this.query = newQuery;
                    new GetList(this.props.dispatch, this.props.listManager, this.query, thisList.params);
                }
            }
            else if (thisList.pending && isApiActionDone(nextProps.api, nextProps.listManager.get.action)) {
                const list = new EvaluateList(nextProps.dispatch, nextProps.api, nextProps.listManager).getList();
                this.setState({ list });
            }
        }
    }
    render() {
        return React.createElement(this.props.listManager.root.element, this.props.listManager.root.props || {},
            new StudentList(this.state.list, this.props.listManager.each).render());
    }
}