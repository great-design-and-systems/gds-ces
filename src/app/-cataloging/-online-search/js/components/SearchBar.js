import React from 'react';
export default class SearchBar extends React.Component {
    componentWillMount() {
        this.setState({
            placeholder: 'ISBN'
        });
        this.searchType = 'isbn';
    }

    handleOnChangeInput(event) {
        if (this.props.onChange) {
            this.props.onChange(this.searchType + '=' + event.target.value);
        }
    }

    handleOnChangeSearchType(event) {
        switch (event.target.value) {
            case 'isbn':
                this.setState({
                    placeholder: 'Search with ISBN'
                });
                break;
            case 'title':
                this.setState({
                    placeholder: 'Search with title'
                });
                break;
            case 'author':
                this.setState({
                    placeholder: 'Search with author'
                });
                break;
            case 'subject':
                this.setState({
                    placeholder: 'Search with subject'
                });
                break;
        }
        this.searchType = event.target.value;
    }

    render() {
        return (
            <div class="search-bar input-group column">
                <span class="input-group-label"><i class="fa fa-search fa-fw fa-lg"/></span>
                <input placeholder={this.state.placeholder} value={this.state.search} type="text"
                       onChange={this.handleOnChangeInput.bind(this)}
                       class="input-group-field"/>
                <select onChange={this.handleOnChangeSearchType.bind(this)} class="input-group-button">
                    <option value="isbn">ISBN</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="subject">Subject</option>
                </select>
            </div>);
    }
}
