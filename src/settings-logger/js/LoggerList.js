import { AppList, AppListActions, ListFilter, ListLimit, ListPages, ListSort } from '../../app-list/js/AppListComponent';
import { Sticky, StickyContainer } from 'react-sticky';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';
import { View } from '../../common/AppComponents';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class LoggerList extends React.Component {
    constructor(props) {
        super();
        this.actions = new AppListActions('loggerList', props.dispatch);
    }
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
        this.actions.setParams({
            serviceName: this.state.domain
        });
    }
    handleSubmit(event) {
        event.preventDefault();;
        this.actions.setDirty(true);
    }
    handleChangeDomain(event) {
        this.actions.setParams({
            serviceName: event.target.value
        });
    }
    render() {
        const options = [<option key={'none'} value=''>--select a domain--</option>];
        options.push(<option key={'GDS_API'} value="GDS_API">API</option>)
        if (this.domains) {
            this.domains.forEach(domain => {
                options.push(<option key={domain} value={domain}>{domain}</option>)
            })
        }
        return (
            <View load={AppInterceptor}>
                <StickyContainer class="logger-list">
                    <h4>Application Logs </h4>
                    <Sticky topOffset={95}>
                        <form class="row" onSubmit={this.handleSubmit.bind(this)}>
                            <label class="column large-2">
                                <span>Domain</span>
                                <select required type="text" onChange={this.handleChangeDomain.bind(this)} value={this.state.domain} name="domain">
                                    {options}
                                </select>
                            </label>
                            <label class="column large-2 end">
                                <span>Limit</span>
                                <ListLimit target="loggerList" options={[25, 50, 75, 100]} />
                            </label>
                            <div class="column large-3 end paginate-section">
                                <ListPages target="loggerList" />
                            </div>
                            <div class="column large-2 end submit-section">
                                <button type="submit" class="button">Submit</button>
                            </div>
                        </form>
                    </Sticky>
                    <table>
                        <thead>
                            <tr>
                                <th><Sticky topOffset={95}><ListSort target="loggerList" field='createdOn' label='Created On' /></Sticky></th>
                                <th><Sticky topOffset={95}><ListSort target="loggerList" field='loggerType' label='Type' /></Sticky></th>
                                <th><Sticky topOffset={95}><ListSort target="loggerList" field='message' label='Message' /></Sticky></th>
                            </tr>
                        </thead>
                        <AppList id="loggerList" listManager={this.listManager} />
                    </table>
                </StickyContainer></View>)
    }
}