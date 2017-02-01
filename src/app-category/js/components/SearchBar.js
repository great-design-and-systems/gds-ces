import React from 'react';
import lodash from 'lodash';

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
    componentDidUpdate(prevProps) {
        if (prevProps.category.name !== this.props.category.name) {
            this.setSearchBarState(this.props);
        }
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
        this.setState({
            search: event.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(event.target.value, this.state.filter);
        }
    }
    handleOnSelectFieldType(event) {
        this.setState({
            filter: event.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.search, event.target.value);
        }
    }
    render() {
        const filterOptions = [];
        if (this.state.filterFields) {
            this.state.filterFields.forEach(filter => {
                filterOptions.push(<option key={filter._id} value={filter.name}>{filter.name}</option>);
            });
        }
        return (
            <div class="search-bar row align-center expanded">
                <div class="input-group large-8 medium-7 small-12">
                    <span class="input-group-label"><i class="fa fa-search fa-fw fa-lg" /></span>
                    <input value={this.state.search} type="text" onChange={this.handleOnChangeInput.bind(this)} class="input-group-field" />
                </div>
                <select onChange={this.handleOnSelectFieldType.bind(this)} class="large-4 medium-5 small-12" value={this.state.filter}>{filterOptions}</select>
            </div>)
    }
}       