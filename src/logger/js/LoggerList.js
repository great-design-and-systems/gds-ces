import { Sticky, StickyContainer } from 'react-sticky';
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
        this.props.dispatch(setTarget('loggerList'));
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
            <StickyContainer class="logger-list">
                <Sticky bottomOffset={95}>
                    <form class="header columns large-12 medium-12 small-12" onSubmit={this.handleSubmit.bind(this)}>
                        <label class="column large-2">
                            <span>Domain</span>
                            <select required type="text" onChange={this.handleChangeDomain.bind(this)} value={this.state.domain} name="domain">
                                {options}
                            </select>
                        </label>
                        <label class="column large-2 end">
                            <span>Limit</span>
                            <LimitDropdown target="loggerList" options={[25, 50, 75, 100]} />
                        </label>
                        <div class="column large-3 end paginate-section">
                            <Pages target="loggerList" />
                        </div>
                        <div class="column large-2 end submit-section">
                            <button type="submit" class="button">Submit</button>
                        </div>
                    </form>
                </Sticky>
                <table>
                    <thead>
                        <tr>
                            <th><Sticky topOffset={95}><SortToggle target="loggerList" field='createdOn' label='Created On' /></Sticky></th>
                            <th><Sticky topOffset={95}><SortToggle target="loggerList" field='loggerType' label='Type' /></Sticky></th>
                            <th><Sticky topOffset={95}><SortToggle target="loggerList" field='message' label='Message' /></Sticky></th>
                        </tr>
                    </thead>
                    <AppList id="loggerList" listManager={this.listManager} />
                </table>
            </StickyContainer>)
    }
}