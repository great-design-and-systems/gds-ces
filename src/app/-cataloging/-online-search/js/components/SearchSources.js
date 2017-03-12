import React from 'react';

export default class SearchSources extends React.Component {
    constructor(props) {
        super(props);
        this.librarySources = [
            {label: 'Library of Congress', value: 'LIBRARY_OF_CONGRESS'},
            {label: 'Ministry of Education and Research in Norway', value: 'BIBSYS'}
        ];
        this.options = [];
        this.librarySources.forEach(source=> {
            this.options.push(<option key={source.value.hashCode()} value={source.value}>{source.label}</option>);
        });
    }

    handleOnChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    render() {
        return (
            <div class="search-sources column"><select onChange={this.handleOnChange.bind(this)}>{this.options}</select></div>)
    }
}