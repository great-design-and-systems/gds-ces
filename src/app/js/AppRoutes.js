import { AppCategory, CategoryMenu } from '../-category/js/AppCategory';
import { AppHome, HomeCategories, HomeMenu } from '../-home/js/AppHome';
import { AppSettings, SettingsMenu } from '../-settings/js/AppSettings';
import {SettingsItemForm,SettingsItemControls,SettingItemList,SettingsItemListControls} from '../-settings/-items/js/SettingsItems';
import {CataloguingBody, CataloguingControls} from '../-settings/-cataloguing/js/SettingsCataloguig';
import {ManualEntryBody, ManualEntryBasic} from '../-settings/-cataloguing/-manual-entry/js/ManualEntry';
export const Category = {
    body: AppCategory,
    menu: CategoryMenu
};

export const Settings = {
    body: AppSettings,
    menu: SettingsMenu,
    content: {
        items: {
            form: SettingsItemForm,
            formControl: SettingsItemControls,
            list: SettingItemList,
            listControl: SettingsItemListControls
        },
        cataloguing: {
            body: CataloguingBody,
            content: {
                manualEntry: {
                    body: ManualEntryBody,
                    tabs: {
                        basic: ManualEntryBasic
                    }
                }
            },
            controls: CataloguingControls
        }
    }
};

export const Home = {
    body: AppHome,
    menu: HomeMenu,
    content: {
        categories: HomeCategories
    }
}