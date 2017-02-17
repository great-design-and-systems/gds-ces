import { setDirty, setFilter, setJson, setLimit, setPage, setParams, setPending, setStart, setTotal, togglePending, setQuery } from './CommonAsyncListActions';

import AsyncList from './components/AsyncList';
import FilterBox from './components/FilterBox';
import LimitDropdown from './components/LimitDropdown';
import Pages from './components/Pages';
import SortToggle from './components/SortToggle';

export const CommonAList = AsyncList;
export const CommonListFilter = FilterBox;
export const CommonListLimit = LimitDropdown;
export const CommonListPages = Pages;
export const CommonListSort = SortToggle;
export class CommonAListActions {
    constructor(target, dispatch) {
        this.dispatch = dispatch;
        this.target = target;
    }

    setDirty(dirty) {
        this.dispatch(setDirty(dirty, this.target));
    }

    setParams(params) {
        this.dispatch(setParams(params, this.target));
    }

    setJson(json) {
        this.dispatch(setJson(json, this.target));
    }

    setQuery(query) {
        this.dispatch(setQuery(query, this.target));
    }
}
