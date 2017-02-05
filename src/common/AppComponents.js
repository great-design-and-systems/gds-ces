import { addError, clearErrors, setErrors } from './messages/js/CommonMessagesActions';
import { reload, reloaded } from './view/js/CommonViewActions';

import CommonBody from './body/js/CommonBody';
import CommonCategories from './catetgories/js/CommonCategories';
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