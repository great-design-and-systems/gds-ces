import InputField from './components/InputField';
import React from 'react';

export default class CommonListInput extends React.Component {
    setCommonListInput(props) {
        this.setState({ value: props.value || [''] });
    }
    componentWillMount() {
        this.setCommonListInput(this.props);
    }
    componentDidUpdate() {
        this.setCommonListInput(this.props);
    }
    handleChange(event, index) {

    }
    handleAddInput() {
        this.value.push('');
    }
    render() {
        const inputList = [];
        if (this.state.value) {
            this.state.value.forEach((itemValue, index) => {
                inputList.push(<InputField key={itemValue.hashCode() } onAdd={this.handleAddInput.bind(this) }index={index} value={itemValue} onChange={this.handleChange.bind(this) }/>)
            });
        }
        return (<div class="list-input">
            {inputList}
        </div>);
    }
}