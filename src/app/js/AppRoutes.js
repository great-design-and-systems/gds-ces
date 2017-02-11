import { AppCategory, CategoryMenu } from '../-category/js/AppCategory';
import { AppHome, HomeCategories, HomeMenu } from '../-home/js/AppHome';
import { AppSettings, SettingsMenu } from '../-settings/js/AppSettings';

export const Category = {
    body: AppCategory,
    menu: CategoryMenu
};

export const Settings = {
    body: AppSettings,
    menu: SettingsMenu
}

export const Home = {
    body: AppHome,
    menu: HomeMenu,
    content: {
        categories: HomeCategories
    }
}