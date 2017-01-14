import { setDirty, setFilter, setLimit, setPage, setParams, setPending, setStart, setTarget, setTotal, togglePending } from './AppListActions';

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
        this.dispatch(setTarget(this.target));
        this.dispatch(setDirty(dirty));
    }
}
