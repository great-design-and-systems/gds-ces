import React from 'react';
export default class SearchBar extends React.Component {
    componentWillMount(){
        this.setState({});
    }
    handleOnChangeInput(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    render() {
        return (
            <div class="search-bar input-group column">
                <span class="input-group-label"><i class="fa fa-search fa-fw fa-lg"/></span>
                <input placeholder='Search for materials' value={this.state.search} type="text"
                       onChange={this.handleOnChangeInput.bind(this)}
                       class="input-group-field"/>
            </div>);
    }
}
