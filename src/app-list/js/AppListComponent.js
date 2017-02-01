import { setDirty, setFilter, setJson, setLimit, setPage, setParams, setPending, setStart, setTotal, togglePending } from './AppListActions';

import AsyncList from './components/AsyncList';
import FilterBox from './components/FilterBox';
import LimitDropdown from './components/LimitDropdown';
import Pages from './components/Pages';
import SortToggle from './components/SortToggle';

export const AppList = AsyncList;
export const ListFilter = FilterBox;
export const ListLimit = LimitDropdown;
export const ListPages = Pages;
export const ListSort = SortToggle;
export class AppListActions {
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
}
