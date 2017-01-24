import { addError, clearErrors, setErrors } from '../common-messages/js/CommonMessagesActions';
import { reload, reloaded } from '../common-view/js/CommonViewActions';

import CommonBody from '../common-body/js/CommonBody';
import CommonCategories from '../common-categories/js/CommonCategories';
import CommonContent from '../common-content/js/CommonContent';
import CommonFileUpload from '../common-fileupload/js/CommonFileupload';
import CommonIconBox from '../common-icon-box/js/CommonIconBox';
import CommonMessages from '../common-messages/js/CommonMessages';
import CommonProgressbar from '../common-progressbar/js/CommonProgressbar';
import CommonSideBar from '../common-sidebar/js/CommonSidebar';
import CommonSwitch from '../common-switch/js/CommonSwitch';
import CommonToolbar from '../common-toolbar/js/CommonToolbar';
import CommonView from '../common-view/js/CommonView';

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
export const MessagesActions = {
    addError: addError,
    clearErrors: clearErrors,
    setErrors: setErrors
}
export const ViewActions = {
    reload: reload,
    reloaded: reloaded
}