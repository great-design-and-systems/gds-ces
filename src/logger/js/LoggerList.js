import { setDirty, setParams, setTarget } from '../../app-list/js/AppListActions';

import AppList from '../../app-list/js/AppListComponent';
import FilterBox from '../../app-list/js/components/FilterBox';
import LimitDropdown from '../../app-list/js/components/LimitDropdown';
import Pages from '../../app-list/js/components/Pages';
import React from 'react';
import SortToggle from '../../app-list/js/components/SortToggle';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class LoggerList extends React.Component {
    componentWillMount() {
        this.setState({});
        this.listManager = {
            root: {
                element: 'tbody'
            },
            get: {
                action: '{Logger.getLogger}',
                eval: 'data.docs',
                params: {
                    serviceName: 'Category'
                }
            },
            each: {
                component: (logger, index) => {
                    return (
                        <tr className={logger.loggerType.toLowerCase()} key={logger._id}>
                            <td>{logger.createdOn}</td>
                            <td>{logger.loggerType}</td>
                            <td>{logger.message}</td>
                        </tr>)
                }
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                },
                filter: 'page_filter={field}:{value}'
            },
            eval: {
                total: 'data.total'
            }
        };
        this.domains = lodash.keys(window.gdsApi);
    }
    componentDidMount() {
        this.props.dispatch(setParams({
            serviceName: this.state.domain
        }));
    }
    handleSubmit(event) {
        event.preventDefault();;
        this.props.dispatch(setTarget('loggerList'));
        this.props.dispatch(setDirty(true));
    }
    handleChangeDomain(event) {
        this.props.dispatch(setParams({
            serviceName: event.target.value
        }));
    }
    render() {
        const options = [<option key={'none'} value=''>-- select a domain --</option>];
        options.push(<option key={'GDS_API'} value="GDS_API">API</option>)
        if (this.domains) {
            this.domains.forEach(domain => {
                options.push(<option key={domain} value={domain}>{domain}</option>)
            })
        }
        return (
            <div class="logger-list">
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label class="columns large-2">
                            Domain
                            <select required type="text" onChange={this.handleChangeDomain.bind(this)} value={this.state.domain} name="domain">
                                {options}
                            </select>
                        </label>
                        <label class="columns large-2 end">
                            Limit
                            <LimitDropdown options={[5, 25, 50, 75, 100]} />
                        </label>
                        <label class="columns large-4 end">
                            Search
                            <FilterBox options={{ '-- select field --': '', 'Type': 'loggerType', 'Message': 'message' }} />
                            <button type="submit" class="button float-right">Submit</button>
                        </label>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><SortToggle target="loggerList" field='createdOn' label='Created On' /></th>
                            <th><SortToggle target="loggerList" field='loggerType' label='Type' /></th>
                            <th><SortToggle target="loggerList" field='message' label='Message' /></th>
                        </tr>
                    </thead>
                    <AppList id="loggerList" listManager={this.listManager} />
                </table>
                <div class="float-left">
                    <Pages target="loggerList" />
                </div>
            </div>)
    }
}