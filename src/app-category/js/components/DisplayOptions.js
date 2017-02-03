import React from 'react';
import { View } from '../../../common/AppComponents';

export default class DisplayOptions extends React.Component {
    componentWillMount() {
        this.setState({});
        this.setDisplayOptionsState();
    }
    setDisplayOptionsState() {
        if (this.props.category && this.props.category.rules) {
            const newState = {
                table: false,
                list: false,
                grid: false
            };
            let display;
            this.props.category.rules.forEach(rule => {
                switch (rule) {
                    case 'view_gridLayout':
                        newState.grid = true;
                        display = 'grid';
                        break;
                    case 'view_listLayout':
                        newState.list = true;
                        //display = 'list';
                        break;
                    case 'view_tableLayout':
                        newState.table = true;
                        //display = 'table';
                        break;
                }
            });
            this.setState(newState);
            if (this.props.onChange) {
                this.props.onChange(display);
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.category.name !== this.props.category.name) {
            this.setDisplayOptionsState();
        }
    }
    handleOnClickGrid() {
        this.setState({ isGrid: true, isTable: false, isList: false });
        if (this.props.onChange) {
            this.props.onChange('grid');
        }
    }
    handleOnClickList() {
        this.setState({ isGrid: false, isTable: false, isList: true });
        if (this.props.onChange) {
            this.props.onChange('list');
        }
    }
    handleOnClickTable() {
        this.setState({ isGrid: false, isTable: true, isList: false });
        if (this.props.onChange) {
            this.props.onChange('table');
        }
    }
    render() {
        const buttons = [];
        if (this.state.grid) {
            buttons.push(<a key={this.props.category.name + '_view_grid'} onClick={this.handleOnClickGrid.bind(this) } className={this.state.isGrid ? 'active' : ''}><i class="fa fa-th fa-fw fa-2x" /></a>)
        }
        /*if (this.state.list) {
            buttons.push(<button key={this.props.category.name + '_view_list'} onClick={this.handleOnClickList.bind(this)} className={this.state.isList ? 'active button' : 'button'} type="button"><i class="fa fa-list fa-fw" /></button>)
        }
        if (this.state.table) {
            buttons.push(<button key={this.props.category.name + '_view_table'} onClick={this.handleOnClickTable.bind(this)} className={this.state.isTable ? 'active button' : 'button'} type="button"><i class="fa fa-table fa-fw" /></button>)
        }*/
        return (<View>
            <div style={{ display: 'none' }} className={'display-options button-group small ' + (this.props.className || '') }>
                {buttons}
            </div>
        </View>)
    }
}