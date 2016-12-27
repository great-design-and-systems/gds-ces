import AppList from '../../app-list/js/AppListComponent';
import React from 'react';
import SortToggle from '../../app-list/js/components/SortToggle';
import { connect } from 'react-redux';
import { setParams } from '../../app-list/js/AppListActions';

@connect()
export default class LoggerList extends React.Component {
    componentWillMount() {
        this.setState({});
        this.props.dispatch(setParams({
            serviceName: ''
        }));
        this.listManager = {
            root: {
                element: 'tbody'
            },
            get: {
                action: '{Logger Service.getLogger}',
                eval: 'data.docs'
            },
            each: {
                component: (logger, index) => {
                    return (<tr className={logger.loggerType.toLowerCase()} key={logger._id}>
                        <td>{logger.createdOn}</td>
                        <td>{logger.loggerType}</td>
                        <td>{logger.message}</td></tr>)
                }
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_start={start}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                }
            }
        };
    }
    handleSubmit(event) {
        event.preventDefault();;
        this.props.dispatch(setParams({
            serviceName: event.target.domain.value
        }));
    }
    render() {
        return (
            <div class="logger-list">
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label class="columns large-3">
                            Domain
                        <input required type="text" value={this.state.domain} name="domain" />
                            <button type="submit" class="button">Submit</button>
                        </label>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><SortToggle field='createdOn' label='Created On' /></th>
                            <th><SortToggle field='loggerType' label='Type' /></th>
                            <th><SortToggle field='message' label='Message' /></th>
                        </tr>
                    </thead>
                    <AppList listManager={this.listManager} />
                </table>
            </div>)
    }
}