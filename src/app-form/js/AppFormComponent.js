import React from 'react';
import {Formly} from 'react-formly';
const AppFormComponent = React.createClass({
    getInitialState: () => {
        return { model: {}, title: 'Cool! You are using AppForm' };
    },
    render: () => {
        return (
            <div class="form-component">
                <h2>{this.state.title}</h2>
                <Formly config={this.formlyConfig} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate.bind(this) } />
            </div>);
    }
})
export default AppFormComponent;