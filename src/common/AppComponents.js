import {
    CommonAList,
    CommonAListActions,
    CommonListFilter,
    CommonListLimit,
    CommonListPages,
    CommonListSort,
} from './async-list/js/CommonAsyncList';
import { addError, clearErrors, setErrors } from './messages/js/CommonMessagesActions';
import { reload, reloaded } from './view/js/CommonViewActions';

import CommonBody from './body/js/CommonBody';
import CommonCategories from './catetgories/js/CommonCategories';
import CommonCategoryForm from './category-form/js/CommonCategoryForm';
import CommonContent from './content/js/CommonContent';
import CommonFileUpload from './fileupload/js/CommonFileupload';
import CommonIconBox from './icon-box/js/CommonIconBox';
import CommonImage from './image/js/CommonImage';
import CommonImageupload from './imageupload/js/CommonImageupload';
import CommonImageviewer from './imageviewer/js/CommonImageviewer';
import CommonLinks from './links/js/CommonLinks';
import CommonMessages from './messages/js/CommonMessages';
import CommonProgressbar from './progressbar/js/CommonProgressbar';
import CommonSideBar from './sidebar/js/CommonSidebar';
import CommonSwitch from './switch/js/CommonSwitch';
import CommonToolbar from './toolbar/js/CommonToolbar';
import CommonView from './view/js/CommonView';

// CommonAsyncList
export const AList = CommonAList;
export const AListActions = CommonAListActions;
export const ListPages = CommonListPages;
export const ListLimit = CommonListLimit;
export const ListSort = CommonListSort;
export const ListFilter = CommonListFilter;
export const Body = CommonBody;
export const Sidebar = CommonSideBar;
export const Content = CommonContent;
export const IconBox = CommonIconBox;
export const View = CommonView;
export const Messages = CommonMessages;
export const Toolbar = CommonToolbar;
export const Categories = CommonCategories;
export const Switch = CommonSwitch;
export const Fileupload = CommonFileUpload;
export const Progressbar = CommonProgressbar;
export const Imageupload = CommonImageupload;
export const Imageviewer = CommonImageviewer;
export const CategoryForm = CommonCategoryForm;
export const Links = CommonLinks;
export const Image = CommonImage;
export const MessagesActions = {
    addError: addError,
    clearErrors: clearErrors,
    setErrors: setErrors
}
export const ViewActions = {
    reload: reload,
    reloaded: reloaded
}