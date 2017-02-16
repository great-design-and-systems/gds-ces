import React from 'react';
export default class SearchBar extends React.Component {
    componentWillMount() {
        this.setState({});
    }

    handleOnChangeInput(event) {

    }

    render() {
        return (<div class="search-bar">
            <div class="input-group large-8 medium-7 small-12">
                <span class="input-group-label"><i class="fa fa-search fa-fw fa-lg"/></span>
                <input value={this.state.search} type="text" onChange={this.handleOnChangeInput.bind(this)}
                       class="input-group-field"/>
            </div>
        </div>);
    }
}
