import React from 'react';
import { Toolbar} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';

@connect(state => {
    return {
        api: state.api,
        manualEntry: state.manualEntry
    }
})
export default class Controls extends React.Component {
    constructor() {
        super();
        this.controls = [
            {
                name: 'saveItem',
                iconClass: 'fa fa-save',
                label: 'Save',
                isVisible: (props) => !props.form.id
            },
            {
                name: 'clear',
                iconClass: 'fa fa-trash',
                label: 'Clear'
            }
        ];
    }

    handleClick(event, action, dispatch) {
        switch (action) {
        }
    }
    render() {
        return <Toolbar onClick={this.handleClick.bind(this)} controls={this.controls}/>
    }
}

