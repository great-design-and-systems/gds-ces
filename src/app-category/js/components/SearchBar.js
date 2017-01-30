import React from 'react';
import lodash from 'lodash';

//TODO: Display field type input if field is selected
export default class SearchBar extends React.Component {
    constructor(props) {
        super();
        if (!props.category) {
            throw new Error('Property category is required.');
        }
    }
    componentWillMount() {
        this.setSearchBarState(this.props);
    }
    setSearchBarState(props) {
        const category = props.category;
        if (category.fields) {
            const filterFields = lodash.filter(category.fields, field => !!field.isFilter);
            this.setState({
                filter: filterFields[0].name,
                filterFields: filterFields
            })
        }
    }
    handleOnChangeInput(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }
    render() {
        const filterOptions = [];
        if (this.state.filterFields) {
            this.state.filterFields.forEach(filter => {
                filterOptions.push(<option key={filter._id} value={filter.name}>{filter.name}</option>)
            });
        }
        return (
            <div class="search-bar row align-center expanded">
                <div class="input-group large-8 medium-7 small-12">
                    <span class="input-group-label"><i class="fa fa-search fa-fw fa-lg" /></span>
                    <input type="text" onChange={this.handleOnChangeInput.bind(this)} class="input-group-field" />
                </div>
                <select class="large-4 medium-5 small-12">{filterOptions}</select>
            </div>)
    }
}       