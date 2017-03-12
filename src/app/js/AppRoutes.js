import { AppCategory, CategoryMenu } from '../-category/js/AppCategory';
import { AppHome, HomeCategories, HomeMenu } from '../-home/js/AppHome';
import { AppSettings, SettingsMenu } from '../-settings/js/AppSettings';
import {CatalogingBody, CatalogingControls, Content} from '../-cataloging/js/Cataloging';

export const Cataloging = {
    body: CatalogingBody,
    content: Content
};

export const Home = {
    body: AppHome,
    menu: HomeMenu,
    content: {
        categories: HomeCategories
    }
};