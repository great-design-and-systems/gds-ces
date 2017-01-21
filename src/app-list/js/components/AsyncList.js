import CreateQuery from '../control/CreateQuery';
import EvaluateList from '../control/EvaluateList';
import GetList from '../control/GetList';
import IsNewQuery from '../control/IsNewQuery';
import React from 'react';
import RenderList from '../control/RenderList';
import { clearList } from '../AppListActions';
import { connect } from 'react-redux';
import { isApiActionDone } from '../../../common/AppUtils';
import lodash from 'lodash';

//TODO: create store per list
@connect(state => {
    return {
        api: state.api,
        list: state.list
    }
})
export default class AsyncList extends React.Component {
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
            const newQuery = new CreateQuery(this.props, {}, this.id).getQuery();
            this.query = newQuery;
            const params = this.props.listManager.get ? this.props.listManager.get.params : {};
            new GetList(this.props.dispatch, this.props.listManager, newQuery, params, this.id);
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearList(this.id));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list.getState) {
            const thisList = nextProps.list.getState(nextProps.id);
            if (!thisList.pending) {
                if (thisList.dirty) {
                    const newQuery = new CreateQuery(nextProps, this.query, nextProps.id).getQuery();
                    this.query = newQuery;
                    new GetList(this.props.dispatch, this.props.listManager, this.query, thisList.params, nextProps.id);
                } else {
                    this.setState({
                        value: nextProps.value
                    });
                }
            }
            else if (thisList.pending && isApiActionDone(nextProps.api, nextProps.listManager.get.action)) {
                const list = new EvaluateList(nextProps.dispatch, nextProps.api, nextProps.listManager, nextProps.id).getList();
                if(nextProps.onComplete){
                    nextProps.onComplete(list);
                }
                this.setState({ list, value: nextProps.value });
            }
        }

    }
    render() {
        const props = this.props.listManager.root.props || {};
        props.value = this.state.value || '';
        return React.createElement(this.props.listManager.root.element, props,
            new RenderList(this.state.list, this.props.listManager.each).render());
    }
}