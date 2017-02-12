import AppSidebarReducer from './AppSidebarReducer';
import { createStore } from 'redux';

const SidebarStore = createStore(AppSidebarReducer);

export default SidebarStore;