import InputField from './components/InputField';
import React from 'react';

export default class CommonListInput extends React.Component {
    setCommonListInput(props) {
        const value = props.value || [''];
        this.value = value;
        this.setState({
            value: value
        });
        this.renderInputList(value);
    }
    componentWillMount() {
        this.setCommonListInput(this.props);
    }
    handleChange(event, index) {
        this.value[index] = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(this.value);
        }
    }
    handleAddInput() {
        const newValue = this.value.slice();
        newValue.push('');
        this.value = newValue;
        this.renderInputList(newValue);
    }
    handleRemoveInput(index) {
        const newValue = this.value.slice();
        newValue.splice(index, 1);
        this.value = newValue;
        this.renderInputList(newValue);
    }
    renderInputList(list) {
        let inputList = [];
        if (list) {
            list.forEach((itemValue, index) => {
                inputList.push(<InputField key={itemValue.hashCode() + '_' + index}
                    onRemove={this.handleRemoveInput.bind(this)} onAdd={this.handleAddInput.bind(this)}
                    index={index} value={itemValue} size={list.length} onChange={this.handleChange.bind(this)} />)
            });
        }
        this.setState({
            inputList: inputList
        })
    }
    render() {
        return (<div class="list-input">
            {this.state.inputList}
        </div>);
    }
}