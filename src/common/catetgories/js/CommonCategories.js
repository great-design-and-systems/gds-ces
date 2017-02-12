import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import AppInterceptor from '../../../app/-interceptor/AppInterceptor';
import CommonView from '../../view/js/CommonView';
import React from 'react';

export default class CommonCategories extends React.Component {
    constructor(props) {
        super();
        if (!props.id) {
            throw new Error('Property id is required.');
        }
        if (!props.dispatch) {
            throw new Error('Property dispatch is required.');
        }
        this.listManager = {
            root: {
                element: 'select',
                props: {
                    disabled: props.disabled,
                    name: props.name,
                    onChange: this.handleSelect.bind(this)
                }
            },
            get: {
                action: '{Category.getCategoryList}',
                eval: 'data.docs'
            },
            each: {
                preComponent: () => <option key={(props.id + 'pre_component').hashCode()}>-- select category --</option>,
                component: item => <option key={item._id} value={item._id}>{item.name}</option>
            }
        };
        this.actions = new AppListActions(props.id, props.dispatch);
    }
    handleSelect(event) {
        this.setState({
            value: event.target.value
        })
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }
    componentWillMount() {
        this.setState({
            value: this.props.value
        })
        this.actions.setDirty(true);
    }
    handleComplete(data) {
        if (this.props.onComplete) {
            this.props.onComplete(data);
        }
    }
    render() {
        return (<AppList onComplete={this.handleComplete.bind(this)} id={this.props.id} value={this.state.value} listManager={this.listManager} />)
    }
}