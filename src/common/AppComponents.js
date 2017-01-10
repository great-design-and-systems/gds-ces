import {addError, clearErrors, setErrors} from '../common-messages/js/CommonMessagesActions';
import {reload, reloaded} from '../common-view/js/CommonViewActions';

import CommonBody from '../common-body/js/CommonBody';
import CommonContent from '../common-content/js/CommonContent';
import CommonIconBox from '../common-icon-box/js/CommonIconBox';
import CommonMessages from '../common-messages/js/CommonMessages';
import CommonSideBar from '../common-sidebar/js/CommonSidebar';
import CommonView from '../common-view/js/CommonView';

export const Body = CommonBody;
export const Sidebar = CommonSideBar;
export const Content = CommonContent;
export const IconBox = CommonIconBox;
export const View = CommonView;
export const Messages = CommonMessages;

export const MessagesActions = {
    addError:addError,
    clearErrors: clearErrors,
    setErrors: setErrors
}

export const ViewActions = {
    reload: reload,
    reloaded: reloaded
}