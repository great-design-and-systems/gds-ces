import Body from './components/Cataloging';
import Controls from './components/Controls';
import Menu from './components/Menu';
import {ManualEntryBody} from '../-manual-entry/js/ManualEntry';
import {OnlineSearchBody, OnlineSearchResults} from '../-online-search/js/OnlineSearch';
import {MaterialsBody} from '../-materials/js/Materials';
import {ImportBody} from '../-online-search/-search-results-import/js/SearchResultsImport';
import {CardViewBody} from '../-card-view/js/CardView';
export const CatalogingBody = Body;
export const CatalogingControls = Controls;
export const Content = {
    main: Menu,
    manualEntry: {
        body: ManualEntryBody
    },
    search: {
        body: OnlineSearchBody,
        content: {
            results: OnlineSearchResults,
            searchResultsImport: ImportBody
        }
    },
    materials: {
        body: MaterialsBody
    },
    card: {
        body: CardViewBody
    }
};