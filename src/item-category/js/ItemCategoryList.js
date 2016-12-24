import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        api: state.api
    }
})
export default class ItemCategoryList extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.props.dispatch({
            type: '{CATEGORY.getCategoryList}',
            payload: {}
        });
    }
    render() {
        const categories = [];
        if (this.props.api.CATEGORY && this.props.api.CATEGORY.getCategoryList) {
            const getCategoryList = this.props.api.CATEGORY.getCategoryList.data;
            if (getCategoryList && getCategoryList.data && getCategoryList.data.docs) {
                getCategoryList.data.docs.forEach(category => {
                    categories.push(<li>{category.name}</li>);
                });
            }
        }
        return (
            <div class="item-category-list">
                {this.props.api.pending ? <h1>Loading</h1> : <h1>Hello Analyn!</h1>}
                <input type="text" />
                <ul>
                    {categories}
                </ul>
            </div>);
    }
}