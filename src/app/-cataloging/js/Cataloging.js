import Body from './components/Cataloging';
import Controls from './components/Controls';
import Menu from './components/Menu';
import {ManualEntryBody} from '../-manual-entry/js/ManualEntry';
export const CatalogingBody = Body;
export const CatalogingControls = Controls;
export const Content = {
    main: Menu,
    manualEntry: {
        body: ManualEntryBody
    }
};